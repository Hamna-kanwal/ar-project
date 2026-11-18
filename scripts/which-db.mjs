// scripts/which-db.mjs
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URL);
await client.connect();
const db = client.db();
console.log("database name:", db.databaseName);
const d = await db.collection("pages").findOne({ id: "about-us" }, { projection: { _id: 0, "body.hero": 1 } });
console.log("about-us body.hero:", JSON.stringify(d));
await client.close();