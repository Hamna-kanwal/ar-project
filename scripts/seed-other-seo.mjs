// scripts/seed-other-seo.mjs
// Usage:
//   node --env-file=.env.local scripts/seed-other-seo.mjs                 (dry run)
//   node --env-file=.env.local scripts/seed-other-seo.mjs --seed          (write to DB)
//   node --env-file=.env.local scripts/seed-other-seo.mjs --seed --force  (overwrite filled SEO)
// Only the "seo" field is touched. The page "body" is never changed.

import { MongoClient } from "mongodb";

const args = process.argv.slice(2);
const SEED = args.includes("--seed");
const FORCE = args.includes("--force");

const SITE = "https://www.arheatingservice.co.uk";
const OG_IMAGE = `${SITE}/logo-footer.webp`;

const PAGES = [
  {
    id: "about-us",
    path: "/about-us",
    title: "About AR Heating | Heating and Plumbing in Watford",
    description:
      "AR Heating is a Gas Safe registered heating and plumbing firm at Unit 24, The Roundway, Watford. We cover Watford, Harrow and nearby towns.",
    alt: "AR Heating engineers in Watford",
  },
  {
    id: "about",
    path: "/about",
    title: "Why Choose AR Heating | Gas Safe Engineers Watford",
    description:
      "Gas Safe registered heating and plumbing engineers in Watford. Fixed prices agreed before work starts. See how we work and check our registration.",
    alt: "Why choose AR Heating Gas Safe engineers in Watford",
  },
  {
    id: "contact",
    path: "/contact",
    title: "Contact AR Heating | Free Quotes in Watford",
    description:
      "Call, WhatsApp or send a message for a free quote from Gas Safe engineers in Watford. Unit 24, The Roundway, WD18 6LB. Call +44 7800 657141.",
    alt: "Contact AR Heating in Watford",
  },
  {
    id: "landlord-gas-safety",
    path: "/landlord-certificate",
    title: "Landlord Gas Safety Certificate CP12 | Watford & Harrow",
    description:
      "Landlord gas safety certificates (CP12) from Gas Safe engineers, No. 574111. Watford, Harrow and London. Digital certificate within 24 hours.",
    alt: "Landlord gas safety certificate CP12 in Watford",
  },
];

const buildSeo = (p) => ({
  meta_title: p.title,
  meta_description: p.description,
  canonical_url: `${SITE}${p.path}`,
  robots: "index, follow",
  og_title: p.title,
  og_description: p.description,
  og_image: OG_IMAGE,
  image_alt_text: p.alt,
  schema_jsonld: "",
});

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL not found. Run with: node --env-file=.env.local scripts/seed-other-seo.mjs");
  process.exit(1);
}

const client = new MongoClient(process.env.DATABASE_URL);

try {
  await client.connect();
  const col = client.db().collection("pages");
  const now = new Date().toISOString();

  for (const p of PAGES) {
    const doc = await col.findOne({ id: p.id }, { projection: { _id: 0, seo: 1 } });
    if (!doc) {
      console.log(`PROBLEM  ${p.id}  page not in DB, run seed-other-pages.mjs --seed first`);
      continue;
    }
    const filled = doc.seo && (doc.seo.meta_title || doc.seo.meta_description);
    if (filled && !FORCE) {
      console.log(`skip     ${p.id}  SEO already filled (use --force to overwrite)`);
      continue;
    }
    if (!SEED) {
      console.log(`dry-run  ${p.id}`, JSON.stringify(buildSeo(p)));
      continue;
    }
    await col.updateOne({ id: p.id }, { $set: { seo: buildSeo(p), updated_at: now } });
    console.log(`seeded   ${p.id}`);
  }
} finally {
  await client.close();
}