// /blogs (blog listing page) ka SEO `pages` collection mein daalta hai.
// Values aap ke app/blogs/layout.jsx se li gayi hain (trailing spaces trim).
// Dobara chalane par jo pehle se hai usay overwrite nahi karta.
//
//   node --env-file=.env.local scripts/seed-blogs-page.mjs

import { MongoClient } from "mongodb";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL nahi mili. Chalao: node --env-file=.env.local scripts/seed-blogs-page.mjs");
  process.exit(1);
}

const SITE = "https://www.arheatingservice.co.uk";
const title = "Heating and Boiler Advice | AR Heating Blog";
const description =
  "Plain advice on boilers, radiators, power flushing and heating costs from the Gas Safe engineers at AR Heating in Watford.";

const doc = {
  id: "blogs",
  path: "/blogs",
  name: "Blogs",
  status: "published",
  version: "1",
  seo: {
    meta_title: title,
    meta_description: description,
    canonical_url: `${SITE}/blogs`,
    robots: "",
    og_title: title,
    og_description: description,
    og_image: `${SITE}/logo-footer.webp`,
    image_alt_text: "",
    schema_jsonld: "",
  },
  updated_at: new Date().toISOString(),
};

const client = new MongoClient(process.env.DATABASE_URL);
await client.connect();
const col = client.db().collection("pages");
await col.createIndex({ id: 1 }, { unique: true });

const res = await col.updateOne({ id: doc.id }, { $setOnInsert: doc }, { upsert: true });
console.log(res.upsertedCount ? "blogs page added" : "blogs page pehle se maujood hai (kuch nahi badla)");
await client.close();
