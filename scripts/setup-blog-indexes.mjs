import { MongoClient } from "mongodb";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing. Run: node --env-file=.env.local scripts/setup-blog-indexes.mjs");
  process.exit(1);
}

const client = new MongoClient(process.env.DATABASE_URL);
await client.connect();
const db = client.db();

await db.collection("pending_changes").createIndex({ pending_id: 1 }, { unique: true });
await db.collection("pending_changes").createIndex({ status: 1, submitted_at: -1 });

console.log("Blog indexes are ready");
await client.close();