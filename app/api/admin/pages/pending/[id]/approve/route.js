import { getAdmin, sameOrigin } from "@/lib/adminSession";
import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { isChangeStale, nextVersion } from "@/lib/version";

export async function POST(req, { params }) {
  if (!sameOrigin(req)) return Response.json({ error: "Bad origin" }, { status: 403 });
  const admin = await getAdmin();
  if (!admin) return Response.json({ error: "Not logged in" }, { status: 401 });

  try {
    const { id } = await params;
    const db = await getDb();

    const change = await db.collection("pending_changes").findOne({ pending_id: id });
    if (!change) {
      return Response.json({ error: "Change not found" }, { status: 404 });
    }
    if (change.status === "approved") {
      return Response.json({ ok: true, message: "Already approved.", alreadyDone: true });
    }
    if (change.status !== "pending") {
      return Response.json({ error: `This change was already ${change.status}.` }, { status: 409 });
    }

    // Make sure the target page exists in the pages collection
    const targetPage = await db.collection("pages").findOne({ id: change.target });
    if (!targetPage) {
      return Response.json({ error: `Target page '${change.target}' does not exist in pages collection.` }, { status: 400 });
    }

    if (isChangeStale(targetPage, change)) {
      return Response.json(
        { error: "The page changed after this update was submitted. Refresh the content and submit a new update." },
        { status: 409 }
      );
    }

    if (!Object.hasOwn(change, "proposed_body")) {
      return Response.json({ error: "This content update has no proposed body to publish." }, { status: 400 });
    }

    const updatedVersion = nextVersion(targetPage.version);
    const versionFilter = targetPage.version === undefined
      ? { version: { $exists: false } }
      : { version: targetPage.version };
    const update = await db.collection("pages").updateOne(
      { id: change.target, ...versionFilter },
      {
        $set: {
          body: change.proposed_body,
          version: updatedVersion,
          updated_at: new Date().toISOString(),
        },
      }
    );
    if (!update.matchedCount) {
      // A parallel request may have just approved this same change
      const latest = await db.collection("pending_changes").findOne({ pending_id: id });
      if (latest?.status === "approved") {
        return Response.json({ ok: true, message: "Already approved.", alreadyDone: true });
      }
      return Response.json({ error: "The page changed while approving. Refresh and try again." }, { status: 409 });
    }

    const decision = await db.collection("pending_changes").updateOne(
      { pending_id: id, status: "pending" },
      {
        $set: {
          status: "approved",
          decided_at: new Date().toISOString(),
          decided_by: admin.email
        }
      }
    );
    if (!decision.modifiedCount) {
      return Response.json({ ok: true, message: "Already approved.", alreadyDone: true });
    }

    let revalidated = true;
    try {
      if (targetPage.path) revalidatePath(targetPage.path, "layout");
    } catch (error) {
      revalidated = false;
      console.error("Page revalidation failed:", error);
    }

    return Response.json({ ok: true, message: "Page content approved and published live.", version: updatedVersion, revalidated });
  } catch (error) {
    console.error("Approve error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}