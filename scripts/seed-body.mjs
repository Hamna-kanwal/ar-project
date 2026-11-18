import { MongoClient } from "mongodb";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pages } from "./seo-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BODY_DIR = path.join(__dirname, "body");

const client = new MongoClient(process.env.DATABASE_URL);
await client.connect();
const col = client.db().collection("pages");

let seeded = 0;
let alreadyHadBody = 0;
let missingFile = 0;
let invalidJson = 0;
let missingDoc = 0;

for (const p of pages) {
  const id = `services-${p.slug}`;
  const file = path.join(BODY_DIR, `${p.slug}.json`);

  if (!fs.existsSync(file)) {
    console.log(`skip ${p.slug}: no body file yet`);
    missingFile++;
    continue;
  }

  let body;
  try {
    body = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (err) {
    console.error(`invalid JSON in ${p.slug}.json: ${err.message}`);
    invalidJson++;
    continue;
  }

  // Only fill when body is empty, so approved edits are never overwritten
  const res = await col.updateOne(
    { id, $or: [{ body: { $exists: false } }, { body: null }] },
    { $set: { body, updated_at: new Date().toISOString() } }
  );

  if (res.modifiedCount) {
    seeded++;
    console.log(`${p.slug}: seeded`);
  } else {
    // Either the page already has a body, or the page doc does not exist
    const exists = await col.countDocuments({ id }, { limit: 1 });
    if (exists) {
      alreadyHadBody++;
      console.log(`${p.slug}: already has body`);
    } else {
      missingDoc++;
      console.log(`${p.slug}: page doc not found, run seed-pages.mjs first`);
    }
  }
}

console.log(
  `Total ${pages.length} | seeded ${seeded} | already had body ${alreadyHadBody} | no file ${missingFile} | invalid JSON ${invalidJson} | no page doc ${missingDoc}`
);
await client.close();