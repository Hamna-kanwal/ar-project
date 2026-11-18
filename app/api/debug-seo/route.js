import { getAdmin } from "@/lib/adminSession";
import { getDb } from "@/lib/db";
import { isChangeStale } from "@/lib/version";

const typeOf = (v) => (v === null ? "null" : Array.isArray(v) ? "array" : typeof v);

export async function GET() {
  const admin = await getAdmin();
  if (!admin) return Response.json({ error: "Not logged in" }, { status: 401 });

  const db = await getDb();

  const items = await db
    .collection("pending_changes")
    .find({ status: "pending" }, { projection: { _id: 0 } })
    .sort({ submitted_at: -1 })
    .limit(20)
    .toArray();

  const ids = [...new Set(items.map((i) => i.target))];
  const pages = await db
    .collection("pages")
    .find({ id: { $in: ids } }, { projection: { _id: 0 } })
    .toArray();
  const byId = Object.fromEntries(pages.map((p) => [p.id, p]));

  const report = items.map((i) => {
    const p = byId[i.target];
    const problems = [];

    if (!p) problems.push(`Page with id '${i.target}' not found in pages collection`);
    if (p && String(p.version) !== String(i.base_version)) {
      problems.push(`Version mismatch: page=${JSON.stringify(p.version)} item=${JSON.stringify(i.base_version)}. Set the item's base_version to the page version.`);
    }
    if (!i.old_value || Object.keys(i.old_value).length === 0) {
      problems.push("old_value is empty on the item. Before depends on the live page fallback.");
    }
    if (p?.seo && !p.seo.meta_title && !p.seo.meta_description) {
      problems.push("Live page seo values are empty, so Before will be empty.");
    }

    return {
      pending_id: i.pending_id,
      target: i.target,
      stale_result: p ? isChangeStale(p, i) : true,
      page_version: p?.version,
      page_version_type: typeOf(p?.version),
      base_version: i.base_version,
      base_version_type: typeOf(i.base_version),
      live_meta_title: p?.seo?.meta_title,
      live_meta_description: p?.seo?.meta_description,
      old_value: i.old_value,
      new_value: i.new_value,
      problems,
    };
  });

  return Response.json({ count: report.length, report });
}