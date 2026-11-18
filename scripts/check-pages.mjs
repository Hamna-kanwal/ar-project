import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URL);
await client.connect();
const col = client.db().collection("pages");

const ids = [  "home",
  "about-us", "about", "contact", "landlord-gas-safety",
  "harrow-boiler-repair", "harrow-boiler-service", "harrow-plumber",];
for (const id of ids) {
  const d = await col.findOne({ id });
  if (!d) { console.log(id.padEnd(22), "MISSING in DB"); continue; }
  console.log(
    id.padEnd(22),
    "path:", d.path,
    "| body:", d.body ? Object.keys(d.body).join(",") : "EMPTY",
    "| seo title:", d.seo?.meta_title ? "ok" : "EMPTY"
  );
}
await client.close();