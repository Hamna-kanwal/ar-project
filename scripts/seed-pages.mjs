import { MongoClient } from "mongodb";
import { SITE, pages } from "./seo-data.mjs";

const client = new MongoClient(process.env.DATABASE_URL);
await client.connect();
const col = client.db().collection("pages");
await col.createIndex({ id: 1 }, { unique: true });

let inserted = 0;
let skipped = 0;

for (const p of pages) {
  const path = `/Services/${p.slug}`;
  const doc = {
    id: `services-${p.slug}`,
    path,
    name: p.name,
    status: "published",
    version: "1",
    seo: {
      meta_title: p.title,
      meta_description: p.description,
      canonical_url: `${SITE}${path}`,
      robots: "",
      og_title: p.title,
      og_description: p.description,
      og_image: `${SITE}/${p.image}`,
      image_alt_text: "",
      schema_jsonld: "",
    },
    updated_at: new Date().toISOString(),
  };

  // $setOnInsert: dobara run karne par existing (edited) data overwrite nahi hoga
  const res = await col.updateOne({ id: doc.id }, { $setOnInsert: doc }, { upsert: true });
  if (res.upsertedCount) inserted++;
  else skipped++;
}

console.log(`Total ${pages.length} | inserted ${inserted} | already existed ${skipped}`);
await client.close();
