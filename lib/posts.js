import { getDb } from "@/lib/db";

// Public side: only published posts are ever read here
export async function getPost(id) {
  const db = await getDb();
  return db.collection("posts").findOne({ id, status: "published" }, { projection: { _id: 0 } });
}

export async function getPublishedPosts() {
  const db = await getDb();
  return db
    .collection("posts")
    .find({ status: "published" }, { projection: { _id: 0, body: 0 } })
    .sort({ updated_at: -1 })
    .toArray();
}