// Extracts text from the 3 Harrow page.jsx files and seeds body + SEO into the "pages" collection.
//
//   node scripts/seed-harrow-pages.mjs                                  -> dry run, only writes scripts/body/<id>.json
//   node --env-file=.env.local scripts/seed-harrow-pages.mjs --seed     -> writes to DB
//   ... --seed --force                                                  -> overwrite existing body and SEO
//   ... --root D:\ar-project                                            -> project folder (default: current folder)

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n) => {
  const i = args.indexOf(n);
  return i >= 0 ? args[i + 1] : undefined;
};
const ROOT = opt("--root") || ".";
const SEED = flag("--seed");
const FORCE = flag("--force");

const SITE = "https://www.arheatingservice.co.uk";
const OG_IMAGE = `${SITE}/logo-footer.webp`;

// ---------- helpers ----------
const clean = (s) => s.replace(/\s+/g, " ").trim();

function one(src, re, label) {
  const m = re.exec(src);
  if (!m) throw new Error(`"${label}" not found in page`);
  return m.slice(1).map(clean);
}

function many(src, re, label) {
  const rows = [...src.matchAll(re)].map((m) => m.slice(1).map(clean));
  if (!rows.length) throw new Error(`"${label}" not found in page`);
  return rows;
}

function jsArray(src, name) {
  const m = new RegExp(`const\\s+${name}\\s*=\\s*\\[`).exec(src);
  if (!m) throw new Error(`array "${name}" not found`);
  const start = m.index + m[0].length - 1;
  let depth = 0, mode = null;
  for (let i = start; i < src.length; i++) {
    const c = src[i], n = src[i + 1];
    if (mode === "line") { if (c === "\n") mode = null; continue; }
    if (mode === "block") { if (c === "*" && n === "/") { mode = null; i++; } continue; }
    if (mode) { if (c === "\\") { i++; continue; } if (c === mode) mode = null; continue; }
    if (c === "/" && n === "/") { mode = "line"; i++; continue; }
    if (c === "/" && n === "*") { mode = "block"; i++; continue; }
    if (c === '"' || c === "'" || c === "`") { mode = c; continue; }
    if (c === "[") depth++;
    else if (c === "]" && --depth === 0) {
      return JSON.parse(
        JSON.stringify(vm.runInNewContext(`(${src.slice(start, i + 1)})`, Object.create(null), { timeout: 1000 }))
      );
    }
  }
  throw new Error(`end of array "${name}" not found`);
}

// ---------- extractor shared by all 3 Harrow pages ----------
function extractHarrow(src) {
  const [title, titleHighlight] = one(src, /<h1[^>]*>\s*([^<]*?)\s*<span[^>]*>([^<]*)<\/span>\s*<\/h1>/, "h1");
  const [heroImage, heroAlt] = one(src, /<NextImage\s+src="([^"]*)"\s+alt="([^"]*)"/, "hero image");
  const badgeRaw = /animate-pulse" \/>\s*([\s\S]*?)\s*<\/span>/.exec(src);
  if (!badgeRaw) throw new Error('"badge" not found in page');
  const badge = clean(badgeRaw[1].replace(/&nbsp;/g, " "));

  return {
    hero: {
      image: heroImage,
      imageAlt: heroAlt,
      badge,
      title,
      titleHighlight,
      paragraph: one(src, /<p className="text-base md:text-xl[^"]*">([\s\S]*?)<\/p>/, "hero paragraph")[0],
      primaryButton: "Get my free quote",
      callLabel: "Call:",
      phoneDisplay: "+44 7800 657141",
      phoneTel: "+447800657141",
    },
    trustItems: many(src, /\{\s*icon:\s*<Icon\w+\s*\/>,\s*label:\s*"([^"]*)"\s*\}/g, "trust items").map((r) => r[0]),
    serviceDetails: jsArray(src, "serviceDetails"),
    faqSection: {
      eyebrow: "FAQ",
      title: "Frequently Asked Questions",
      subtitle: "Still unsure? Call or WhatsApp us and we will help.",
    },
    faqs: jsArray(src, "faqs").map((f) => ({ q: clean(f.q), a: clean(f.a) })),
    booking: {
      heading: one(src, /<h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">([^<]*)<\/h2>/, "booking heading")[0],
      text: one(src, /<p className="text-sky-100 text-lg mb-8[^"]*">\s*([\s\S]*?)<\/p>/, "booking text")[0],
    },
    relatedServices: many(src, /title:\s*"([^"]*)",\s*desc:\s*"([^"]*)",\s*href:\s*"([^"]*)"/g, "related services").map(
      ([t, d, h]) => ({ title: t, desc: d, href: h })
    ),
    cta: {
      heading: one(src, /<CtaBanner\s+heading="([^"]*)"/, "cta heading")[0],
      text: one(src, /<CtaBanner\s+heading="[^"]*"\s+text="([^"]*)"/, "cta text")[0],
    },
  };
}

// ---------- Pages ----------
const PAGES = [
  {
    id: "harrow-boiler-repair",
    name: "Boiler Repair Harrow",
    path: "/harrow/boiler-repair",
    title: "Boiler Repair Harrow | Gas Safe Engineers, 60-90 Min",
    description:
      "Boiler broken down in Harrow? Gas Safe engineers (No. 574111) reach you in 60 to 90 minutes. Fixed price before work starts. Call +44 7800 657141.",
    alt: "Gas Safe engineer repairing a boiler in Harrow",
  },
  {
    id: "harrow-boiler-service",
    name: "Boiler Service Harrow",
    path: "/harrow/boiler-services",
    title: "Boiler Service Harrow | Gas Safe Annual Service & CP12",
    description:
      "Yearly boiler service in Harrow from Gas Safe engineers, No. 574111. Fixed price, written record and CP12 on the same visit. Call +44 7800 657141.",
    alt: "Gas Safe engineer servicing a boiler in Harrow",
  },
  {
    id: "harrow-plumber",
    name: "Plumbers in Harrow",
    path: "/harrow/plumber",
    title: "Plumbers in Harrow | Leaks, Blockages & Emergencies",
    description:
      "Local plumbers in Harrow, Pinner and Stanmore. Leaks, blocked drains, taps and toilets fixed, with emergency visits in 60 to 90 minutes. Fixed prices.",
    alt: "Plumber repairing pipework in a Harrow kitchen",
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

// ---------- run ----------
const outDir = join(ROOT, "scripts", "body");
mkdirSync(outDir, { recursive: true });
const ready = [];
let bad = 0;

console.log("\nPage".padEnd(26), "status");
for (const p of PAGES) {
  const file = ["page.jsx", "page.js"]
    .map((f) => join(ROOT, "app", ...p.path.split("/").filter(Boolean), f))
    .find(existsSync);
  if (!file) {
    console.log(p.id.padEnd(25), `PROBLEM: app${p.path}/page.jsx not found`);
    bad++;
    continue;
  }
  try {
    const body = extractHarrow(readFileSync(file, "utf8").replace(/\r\n/g, "\n"));
    writeFileSync(join(outDir, `${p.id}.json`), JSON.stringify(body, null, 2) + "\n");
    console.log(
      p.id.padEnd(25),
      `ok  -> scripts/body/${p.id}.json  (${body.serviceDetails.length} tabs, ${body.faqs.length} faqs)`
    );
    ready.push({ ...p, body });
  } catch (err) {
    console.log(p.id.padEnd(25), "PROBLEM:", err.message);
    bad++;
  }
}

if (SEED) {
  if (!process.env.DATABASE_URL) {
    console.error("\nDATABASE_URL not found. Run: node --env-file=.env.local scripts/seed-harrow-pages.mjs --seed");
    process.exit(1);
  }
  const { MongoClient } = await import("mongodb");
  const client = new MongoClient(process.env.DATABASE_URL);
  await client.connect();
  const col = client.db().collection("pages");
  await col.createIndex({ id: 1 }, { unique: true });
  const now = new Date().toISOString();

  console.log("\nDB seed:");
  for (const p of ready) {
    const existing = await col.findOne({ id: p.id }, { projection: { _id: 0, body: 1, seo: 1 } });
    if (!existing) {
      await col.insertOne({
        id: p.id, path: p.path, name: p.name, status: "published", version: "1",
        seo: buildSeo(p), body: p.body, updated_at: now,
      });
      console.log(" ", p.id.padEnd(24), "new page created (body + SEO)");
      continue;
    }
    const set = {};
    if (!existing.body || FORCE) set.body = p.body;
    const seoFilled = existing.seo && (existing.seo.meta_title || existing.seo.meta_description);
    if (!seoFilled || FORCE) set.seo = buildSeo(p);
    if (Object.keys(set).length === 0) {
      console.log(" ", p.id.padEnd(24), "skipped: body and SEO already filled (use --force to overwrite)");
      continue;
    }
    set.updated_at = now;
    await col.updateOne({ id: p.id }, { $set: set });
    console.log(" ", p.id.padEnd(24), `updated: ${Object.keys(set).filter((k) => k !== "updated_at").join(", ")}`);
  }
  await client.close();
}

if (bad) {
  console.log(`\n${bad} page(s) had problems and were not saved.`);
  process.exit(1);
}