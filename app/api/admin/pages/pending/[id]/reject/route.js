import { getAdmin, sameOrigin } from "@/lib/adminSession";
import { getDb } from "@/lib/db";

export async function POST(req, { params }) {
  if (!sameOrigin(req)) return Response.json({ error: "Bad origin" }, { status: 403 });
  const admin = await getAdmin();
  if (!admin) return Response.json({ error: "Not logged in" }, { status: 401 });

  const { id } = await params;
  const db = await getDb();

  const existing = await db.collection("pending_changes").findOne({ pending_id: id });
  if (!existing) {
    return Response.json({ error: "Change not found" }, { status: 404 });
  }
  if (existing.status === "rejected") {
    return Response.json({ ok: true, message: "Already rejected.", alreadyDone: true });
  }
  if (existing.status !== "pending") {
    return Response.json({ error: `This change was already ${existing.status}.` }, { status: 409 });
  }

  const result = await db.collection("pending_changes").updateOne(
    { pending_id: id, status: "pending" },
    {
      $set: {
        status: "rejected",
        decided_at: new Date().toISOString(),
        decided_by: admin.email
      }
    }
  );
  if (!result.modifiedCount) {
    return Response.json({ ok: true, message: "Already decided.", alreadyDone: true });
  }

  return Response.json({ ok: true, message: "Rejected successfully." });
}