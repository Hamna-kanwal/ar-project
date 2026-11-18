import { getDb } from "@/lib/db";

let indexReady = false;

// Mongo mein counter: sab server instances ek hi count dekhte hain.
// Window ke baad documents TTL index se khud delete ho jate hain.
export async function hit(id, scope, windowSec = 60) {
  const db = await getDb();
  const col = db.collection("rate_limits");

  if (!indexReady) {
    await col.createIndex({ expires_at: 1 }, { expireAfterSeconds: 0 });
    indexReady = true;
  }

  const bucket = Math.floor(Date.now() / (windowSec * 1000));
  const r = await col.findOneAndUpdate(
    { _id: `${id}:${scope}:${bucket}` },
    {
      $inc: { count: 1 },
      $setOnInsert: { expires_at: new Date((bucket + 2) * windowSec * 1000) },
    },
    { upsert: true, returnDocument: "after" }
  );
  const doc = r && r.value !== undefined ? r.value : r; // driver v5 aur v6 dono
  return doc?.count ?? 1;
}
