import { getDb } from "@/lib/db";
import { bridge, fail, clampLimit } from "@/lib/seoBridge";

export const dynamic = "force-dynamic";

const STATUSES = ["pending", "approved", "rejected", "all"];

// GET /pending : changes with their status (default: only those waiting for approval)
export const GET = bridge(async (request) => {
  const params = new URL(request.url).searchParams;
  const status = params.get("status") || "pending";
  if (!STATUSES.includes(status)) return fail(400, `status must be one of: ${STATUSES.join(", ")}`);

  const limit = clampLimit(params.get("limit"));
  const filter = status === "all" ? {} : { status };

  const cursor = params.get("cursor");
  if (cursor) {
    const [ts, pid] = cursor.split("|");
    if (!ts || !pid) return fail(400, "Invalid cursor");
    filter.$or = [{ submitted_at: { $lt: ts } }, { submitted_at: ts, pending_id: { $lt: pid } }];
  }

  const db = await getDb();
  // decided_by (admin email) and internal fields are never returned
  const rows = await db
    .collection("pending_changes")
    .find(filter, { projection: { _id: 0, decided_by: 0, base_version: 0 } })
    .sort({ submitted_at: -1, pending_id: -1 })
    .limit(limit + 1)
    .toArray();

  const items = rows.slice(0, limit);
  const last = items[items.length - 1];
  return {
    status: 200,
    body: { items, next_cursor: rows.length > limit ? `${last.submitted_at}|${last.pending_id}` : null },
  };
});