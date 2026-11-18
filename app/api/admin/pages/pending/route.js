import { getAdmin } from "@/lib/adminSession";
import { getDb } from "@/lib/db";
import { isChangeStale } from "@/lib/version";

export async function GET(req) {
  const admin = await getAdmin();
  if (!admin) return Response.json({ error: "Not logged in" }, { status: 401 });

  const status = new URL(req.url).searchParams.get("status");
  const filter = ["pending", "approved", "rejected"].includes(status) ? { status } : {};

  const db = await getDb();

  const query = {
    ...filter,
    $or: [
      { type: "page_update" },
      { proposed_body: { $exists: true } },
    ],
  };

  const items = await db
    .collection("pending_changes")
    .find(query, { projection: { _id: 0 } })
    .sort({ submitted_at: -1 })
    .limit(100)
    .toArray();

  const ids = [...new Set(items.map((i) => i.target))];
  const pages = await db
    .collection("pages")
    .find({ id: { $in: ids } }, { projection: { _id: 0, id: 1, name: 1, version: 1 } })
    .toArray();
  const byId = Object.fromEntries(pages.map((p) => [p.id, p]));

  return Response.json({
    items: items.map((i) => {
      const p = byId[i.target];
      return {
        ...i,
        page_name: p?.name || i.target,
        current_version: p?.version ?? null,
        stale: i.status === "pending" && isChangeStale(p, i),
      };
    }),
  });
}