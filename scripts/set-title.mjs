import { MongoClient } from "mongodb";

const id = process.argv[2];
const value = process.argv[3];
if (!id || !value) {
  console.error('Usage: node --env-file=.env.local scripts/set-title.mjs <page-id> "<new title>"');
  process.exit(1);
}

const client = new MongoClient(process.env.DATABASE_URL);
await client.connect();
const col = client.db().collection("pages");

const before = await col.findOne({ id }, { projection: { _id: 0, "body.hero.title": 1 } });
console.log("before:", before?.body?.hero?.title);

await col.updateOne({ id }, { $set: { "body.hero.title": value } });
console.log("after: ", value);

await client.close();