// Extracts home page text from the 8 components and seeds body + SEO into the "pages" collection.
//
//   node scripts/seed-home.mjs                                  -> dry run, only writes scripts/body/home.json
//   node --env-file=.env.local scripts/seed-home.mjs --seed     -> writes to DB
//   ... --seed --force                                          -> overwrite existing body and SEO
//   ... --root D:\ar-project                                    -> project folder (default: current folder)

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

// ---------- helpers ----------
const clean = (s) => s.replace(/\s+/g, " ").trim();
const dec = (s) => clean(s.replace(/&apos;/g, "'").replace(/&amp;/g, "&"));

function one(src, re, label) {
  const m = re.exec(src);
  if (!m) throw new Error(`"${label}" not found`);
  return m.slice(1).map(clean);
}

function many(src, re, label, expected) {
  const rows = [...src.matchAll(re)].map((m) => m.slice(1).map(clean));
  if (expected && rows.length !== expected) {
    throw new Error(`"${label}": expected ${expected}, found ${rows.length}`);
  }
  if (!rows.length) throw new Error(`"${label}" not found`);
  return rows;
}

function jsArray(src, name) {
    const m = new RegExp(`(?:export\\s+)?const\\s+${name}\\s*=\\s*\\[`).exec(src);
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

function read(name) {
  const file = ["jsx", "js"].map((e) => join(ROOT, "app", "Components", `${name}.${e}`)).find(existsSync);
  if (!file) throw new Error(`app/Components/${name}.jsx not found`);
  return readFileSync(file, "utf8").replace(/\r\n/g, "\n");
}

// ---------- extractor ----------
function extractHome() {
  // Hero slider
  const hero = {
    slides: jsArray(read("HeroSlider"), "SLIDES").map((s) => ({
      title: clean(s.title),
      desc: clean(s.desc),
      img: s.img,
      buttonText: clean(s.buttonText),
      buttonLink: s.buttonLink,
    })),
  };

  // Services carousel
  const svc = read("ServiceList");
  const services = {
    heading: one(svc, /<h2 className="text-5xl font-bold text-\[#027cc1\] mb-12">([^<]*)<\/h2>/, "services heading")[0],
    items: many(
      svc,
      /name:\s*"([^"]*)",\s*desc:\s*"([^"]*)",\s*icon:\s*<\w+\s*\/>,\s*link:\s*"([^"]*)"/g,
      "services items",
      17
    ).map(([name, desc, link]) => ({ name, desc, link })),
  };

  // Video + intro
  const vid = read("VideoSection");
  const [aboutHref, aboutLabel] = one(vid, /href="(\/about)"[\s\S]*?>\s*([^<]*?)\s*<svg/, "primary button");
  const [callHref, callLabel] = one(vid, /href="(tel:[^"]*)"[\s\S]*?>\s*([^<]*?)\s*<\/Link>/, "call button");
  const video = {
    heading: dec(one(vid, /<h2 className="text-3xl lg:text-4xl font-bold text-\[#005f93\] leading-tight">([\s\S]*?)<\/h2>/, "video heading")[0]),
    paragraphs: many(vid, /<p className="text-gray-600 text-base leading-relaxed">([\s\S]*?)<\/p>/g, "video paragraphs", 3).map((r) => dec(r[0])),
    primaryButton: { label: aboutLabel, href: aboutHref },
    callButton: { label: callLabel, href: callHref },
  };

  // About section
  const abt = read("AboutSection");
  const about = {
    heading: dec(one(abt, /<h2 className="text-3xl sm:text-4xl font-bold text-\[#005f93\] mb-6 text-balance">([\s\S]*?)<\/h2>/, "about heading")[0]),
    subheading: dec(one(abt, /<p className="font-semibold text-lg">([\s\S]*?)<\/p>/, "about subheading")[0]),
    paragraphs: many(abt, /<p>\s*([\s\S]*?)\s*<\/p>/g, "about paragraphs", 2).map((r) => dec(r[0])),
  };

  // Trust section (Badge.jsx)
  const tr = read("Badge");
  const trust = {
    cardTitle: one(tr, /<h3 className="text-2xl font-bold">([^<]*)<\/h3>/, "trust card title")[0],
    cardNote: one(tr, /<p className="text-gray-600 italic">"([^"]*)"<\/p>/, "trust card note")[0],
    verifyLabel: one(tr, />\s*(Verify Registration[^<]*?)\s*<\/Link>/, "verify label")[0],
    heading: one(tr, /<h2 className="text-2xl md:text-2xl whitespace-nowrap font-bold mb-2 leading-tight">([\s\S]*?)<\/h2>/, "trust heading")[0],
    paragraph: one(tr, /<p className="text-lg text-gray-200 mb-3">([\s\S]*?)<\/p>/, "trust paragraph")[0],
    badges: many(
      tr,
      /<h4 className="font-bold text-lg">([^<]*)<\/h4>\s*<p className="text-sm text-gray-300">([^<]*)<\/p>/g,
      "trust badges",
      2
    ).map(([title, text]) => ({ title, text })),
  };

  // Strategy cards
  const st = read("Strategy");
  const strategy = {
    items: many(st, /title:\s*"([^"]*)",\s*description:\s*"([^"]*)"/g, "strategy items", 3).map(([title, description]) => ({ title, description })),
  };

  // FAQs (Faqs.jsx)
  const fq = read("Faqs");
  const faqs = {
    heading: one(fq, /<h2 className="text-4xl font-bold mb-10">([^<]*)<\/h2>/, "faq heading")[0],
    items: jsArray(fq, "faqs").map((f) => ({ q: clean(f.q), a: clean(f.a) })),
  };

  // CTA banner
  const ct = read("CTA");
  const [headingStart, headingHighlight] = one(ct, /<h2[^>]*>\s*([\s\S]*?)\{" "\}\s*<span[^>]*>([^<]*)<\/span>\s*<\/h2>/, "cta heading");
  const cta = {
    headingStart,
    headingHighlight,
    text: one(ct, /<p className="text-white\/80 text-base md:text-lg mb-8 max-w-xl font-medium">\s*([\s\S]*?)<\/p>/, "cta text")[0],
  };

  return { hero, services, video, about, trust, strategy, faqs, cta };
}

// ---------- page ----------
const PAGE = {
  id: "home",
  name: "Home Page",
  path: "/",
  title: "Gas Safe Heating Engineers in Watford | AR Heating",
  description:
    "Boiler installation, repair and servicing in Watford and Harrow. Gas Safe No. 574111. Free fixed price quotes. Emergency callouts 24 hours.",
  ogImage: `${SITE}/heating_installation.webp`,
  alt: "Gas Safe heating engineers in Watford",
};

const seo = {
  meta_title: PAGE.title,
  meta_description: PAGE.description,
  canonical_url: `${SITE}/`,
  robots: "index, follow",
  og_title: PAGE.title,
  og_description: PAGE.description,
  og_image: PAGE.ogImage,
  image_alt_text: PAGE.alt,
  schema_jsonld: "",
};

// ---------- run ----------
const outDir = join(ROOT, "scripts", "body");
mkdirSync(outDir, { recursive: true });

let body;
try {
  body = extractHome();
  writeFileSync(join(outDir, "home.json"), JSON.stringify(body, null, 2) + "\n");
  console.log(
    "home  ok  -> scripts/body/home.json",
    `(${body.hero.slides.length} slides, ${body.services.items.length} services, ${body.faqs.items.length} faqs)`
  );
} catch (err) {
  console.log("home  PROBLEM:", err.message);
  process.exit(1);
}

if (SEED) {
  if (!process.env.DATABASE_URL) {
    console.error("\nDATABASE_URL not found. Run: node --env-file=.env.local scripts/seed-home.mjs --seed");
    process.exit(1);
  }
  const { MongoClient } = await import("mongodb");
  const client = new MongoClient(process.env.DATABASE_URL);
  await client.connect();
  const col = client.db().collection("pages");
  await col.createIndex({ id: 1 }, { unique: true });
  const now = new Date().toISOString();

  const existing = await col.findOne({ id: PAGE.id }, { projection: { _id: 0, body: 1, seo: 1 } });
  if (!existing) {
    await col.insertOne({
      id: PAGE.id, path: PAGE.path, name: PAGE.name, status: "published", version: "1",
      seo, body, updated_at: now,
    });
    console.log("DB: new page created (body + SEO)");
  } else {
    const set = {};
    if (!existing.body || FORCE) set.body = body;
    const seoFilled = existing.seo && (existing.seo.meta_title || existing.seo.meta_description);
    if (!seoFilled || FORCE) set.seo = seo;
    if (!Object.keys(set).length) {
      console.log("DB: skipped, body and SEO already filled (use --force to overwrite)");
    } else {
      set.updated_at = now;
      await col.updateOne({ id: PAGE.id }, { $set: set });
      console.log("DB: updated", Object.keys(set).filter((k) => k !== "updated_at").join(", "));
    }
  }
  await client.close();
}