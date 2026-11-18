import { getDb } from "@/lib/db";

// Har API call ka log: time, route, method, target, result. Writes mein old/new value bhi.
export async function audit(entry) {
  try {
    const db = await getDb();
    await db.collection("audit_log").insertOne({
      time: new Date().toISOString(),
      ...entry,
    });
  } catch (err) {
    console.error("audit failed:", err);
  }
}
