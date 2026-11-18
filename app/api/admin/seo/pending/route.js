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
      { type: "seo" },
      { type: { $exists: false }, seo: { $exists: true } },
      { type: "page_update", new_value: { $exists: true } }
    ]
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
    .find(
      { id: { $in: ids } },
      { projection: { _id: 0, id: 1, name: 1, path: 1, version: 1, seo: 1 } }
    )
    .toArray();
  const byId = Object.fromEntries(pages.map((p) => [p.id, p]));

  return Response.json({
    items: items.map((i) => {
      const p = byId[i.target];
      const newValue = normalizeSeoValues(
        i.new_value && Object.keys(i.new_value).length ? i.new_value : i.seo
      );
      const oldValue = normalizeSeoValues(i.old_value);

      // For pending items, fall back to the live page values when "before" is missing
      if (i.status === "pending" && p?.seo) {
        for (const key of Object.keys(newValue)) {
          const short = key.replace("seo.", "");
          if (!oldValue[key] && p.seo[short]) {
            oldValue[key] = p.seo[short];
          }
        }
      }

      return {
        ...i,
        old_value: oldValue,
        new_value: newValue,
        page_name: p?.name || i.target,
        page_path: p?.path || "",
        stale: i.status === "pending" && isChangeStale(p, i),
      };
    }),
  });
}

function normalizeSeoValues(values) {
  if (!values || typeof values !== "object" || Array.isArray(values)) return {};
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key.startsWith("seo.") ? key : `seo.${key}`,
      value,
    ])
  );
}