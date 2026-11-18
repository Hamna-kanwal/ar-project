import { MongoClient } from "mongodb";

const client =
  global._mongoClient ?? (global._mongoClient = new MongoClient(process.env.DATABASE_URL));

export async function getPage(id) {
  try {
    await client.connect();
    return await client
      .db()
      .collection("pages")
      .findOne({ id }, { projection: { _id: 0 } });
  } catch (err) {
    console.error("getPage failed:", err);
    return null; // DB na mile to layout fallback use karega
  }
}
export async function listPages({ limit = 20, cursor } = {}) {
  await client.connect();
  const query = cursor ? { id: { $gt: cursor } } : {};
  const rows = await client
    .db()
    .collection("pages")
    .find(query, { projection: { _id: 0, body: 0 } })
    .sort({ id: 1 })
    .limit(limit + 1)
    .toArray();
  const hasMore = rows.length > limit;
  const items = rows.slice(0, limit);
  return { items, next_cursor: hasMore ? items[items.length - 1].id : null };
}