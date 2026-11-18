// About, Contact aur Landlord (standalone) pages ka text page.jsx files se nikaal kar DB mein daalta hai.
//
//   node scripts/seed-other-pages.mjs                         -> sirf scripts/body/<id>.json banata hai (DB ko haath nahi lagata)
//   node --env-file=.env.local scripts/seed-other-pages.mjs --seed         -> DB mein bhi likhta hai
//   ... --seed --force                                          -> jin pages mein body pehle se hai unhe bhi overwrite
//   ... --landlord-path /apna-route                             -> landlord page ka route (neeche PAGES mein bhi likh sakte ho)
//   ... --root D:\ar-project                                    -> project folder (default: abhi wala folder)
//
// Rules: DB mein page pehle se ho to uska SEO kabhi nahi badalta, sirf `body` set hoti hai.
// Naya page banta hai to SEO fields khali hoti hain (layout.jsx ki SEO baad mein alag seed hogi).

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

// ---------- helpers ----------
const clean = (s) => s.replace(/\s+/g, " ").trim();
function one(src, re, label) {
  const m = re.exec(src);
  if (!m) throw new Error(`"${label}" page mein nahi mila`);
  return m.slice(1).map(clean);
}
function many(src, re, label, expected) {
  const rows = [...src.matchAll(re)].map((m) => m.slice(1).map(clean));
  if (expected && rows.length !== expected) {
    throw new Error(`"${label}": ${expected} milne chahiye the, ${rows.length} mile`);
  }
  if (!rows.length) throw new Error(`"${label}" page mein nahi mila`);
  return rows;
}
function jsArray(src, name) {
  const m = new RegExp(`const\\s+${name}\\s*=\\s*\\[`).exec(src);
  if (!m) throw new Error(`array "${name}" nahi mili`);
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
      return JSON.parse(JSON.stringify(vm.runInNewContext(`(${src.slice(start, i + 1)})`, Object.create(null), { timeout: 1000 })));
    }
  }
  throw new Error(`array "${name}" ka end nahi mila`);
}

// ---------- About Us ----------
function extractAbout(src) {
  const [title, titleHighlight] = one(src, /<h1[^>]*>\s*([^<]*?)\s*<span[^>]*>([^<]*)<\/span>\s*<\/h1>/, "h1");
  return {
    hero: {
      title,
      titleHighlight,
      paragraph: one(src, /<p className="text-lg text-gray-800[^"]*">([\s\S]*?)<\/p>/, "hero paragraph")[0],
    },
    intro: {
      heading: one(src, /<h2 className="text-4xl font-bold text-\[#027cc1\] mb-3">([\s\S]*?)<\/h2>/, "intro heading")[0],
      paragraph: one(src, /<p className="text-gray-600\s+leading-relaxed mb-3">([\s\S]*?)<\/p>/, "intro paragraph")[0],
      highlights: many(src, /<(?:ShieldCheck|Award) className="text-orange-500" \/>\s*([^<]+)<\/div>/g, "highlights", 2).map((r) => r[0]),
      closing: one(src, /<p className="text-gray-600 mb-6 leading-relaxed">([\s\S]*?)<\/p>/, "intro closing paragraph")[0],
      button: one(src, /<button[^>]*>([\s\S]*?)<\/button>/, "button")[0],
    },
    stats: many(src, /val:\s*"([^"]*)",\s*label:\s*"([^"]*)"/g, "stats", 3).map(([value, label]) => ({ value, label })),
    why: {
      heading: one(src, /<h2 className="text-3xl font-bold text-center mb-12">([\s\S]*?)<\/h2>/, "why heading")[0],
      paragraph: one(src, /<h2 className="text-3xl font-bold text-center mb-12">[\s\S]*?<\/h2>\s*<p>([\s\S]*?)<\/p>/, "why paragraph")[0],
    },
    features: many(src, /\{\s*title:\s*"([^"]*)",\s*desc:\s*"([^"]*)"/g, "features", 4).map(([title, desc]) => ({ title, desc })),
  };
}

// ---------- Contact ----------
function extractContact(src) {
  const [title, titleHighlight] = one(src, /<h1[^>]*>\s*([^<]*?)\s*<span[^>]*>([^<]*)<\/span>\s*<\/h1>/, "h1");
  const whyArray = /\[\s*((?:'[^']*'\s*,?\s*)+)\]\.map\(\(text/.exec(src);
  if (!whyArray) throw new Error('"why choose us" list nahi mili');
  return {
    hero: { title, titleHighlight },
    connect: {
      heading: one(src, /<h2 className="text-4xl font-bold text-\[#027cc1\] tracking-tight mb-4">([\s\S]*?)<\/h2>/, "connect heading")[0],
      subtitle: one(src, /<p className="text-gray-600 font-medium">\s*([\s\S]*?)<\/p>/, "connect subtitle")[0],
      email: one(src, />EMAIL<\/p>\s*<p className="[^"]*">([^<]*)<\/p>/, "email")[0],
      mobile: one(src, />MOBILE<\/p>\s*<p className="[^"]*">([^<]*)<\/p>/, "mobile")[0],
    },
    whyChoose: {
      heading: one(src, /<h4 className="font-bold text-gray-900 mb-6 tracking-wide text-sm">([^<]*)<\/h4>/, "why choose heading")[0],
      items: [...whyArray[1].matchAll(/'([^']*)'/g)].map((m) => clean(m[1])),
    },
    form: {
      submitLabel: one(src, /\{loading \? '[^']*' : '([^']*)'\}/, "form button")[0],
    },
    offices: {
      heading: one(src, /<h3 className="text-3xl font-extrabold text-\[#027cc1\]">([^<]*)<\/h3>/, "offices heading")[0],
      hoursHeading: one(src, /<p className="text-xs font-bold text-gray-400 tracking-wider mb-2">([^<]*)<\/p>/, "hours heading")[0],
      weekdayLabel: one(src, /<p className="font-bold text-gray-800">(Monday[^<]*)<\/p>/, "weekday label")[0],
      weekdayHours: one(src, /Monday[^<]*<\/p>\s*<p className="font-bold text-\[#027cc1\]">([^<]*)<\/p>/, "weekday hours")[0],
      weekendLabel: one(src, /<p className="font-bold text-gray-800">(Weekend)<\/p>/, "weekend label")[0],
      weekendHours: one(src, /Weekend<\/p>\s*<p className="font-bold text-gray-500">([^<]*)<\/p>/, "weekend hours")[0],
      directHeading: one(src, /<p className="text-sm font-extrabold tracking-wider opacity-80">([^<]*)<\/p>/, "direct contact heading")[0],
      switchboard: one(src, /Switchboard:<\/p>\s*<p className="text-xl font-bold">([^<]*)<\/p>/, "switchboard")[0],
      support: one(src, /Support:<\/p>\s*<p className="[^"]*break-all">([^<]*)<\/p>/, "support email")[0],
    },
  };
}

// ---------- Landlord Gas Safety (standalone page) ----------
function extractLandlord(src) {
  const [title, titleHighlight] = one(src, /<h1[^>]*>\s*([^<]*?)\s*<span[^>]*>([^<]*)<\/span>\s*<\/h1>/, "h1");
  const boxTitles = many(src, /<h2 className="text-xl md:text-2xl font-bold text-gray-900">([\s\S]*?)<\/h2>/g, "box titles", 2).map((r) => r[0]);
  const boxParas = many(src, /<p className="text-gray-600 text-sm md:text-base leading-relaxed(?: mb-4)?">([\s\S]*?)<\/p>/g, "box paragraphs", 3).map((r) => r[0]);
  const stats = [
    ...many(src, /<span className="text-4xl font-extrabold text-\[(?:#027cc1|#ff6600)\] mb-1">([^<]*)<\/span>\s*<span[^>]*>([^<]*)<\/span>/g, "stats", 2),
  ].map(([value, label]) => ({ value, label }));
  const [safeTitle, safeNumber] = one(src, /<h4 className="font-bold text-gray-900 text-sm">([^<]*)<\/h4>\s*<p className="text-xs text-gray-500">([^<]*)<\/p>/, "gas safe card");
  return {
    hero: {
      title,
      titleHighlight,
      paragraph: one(src, /<p className="text-lg text-gray-800[^"]*">([\s\S]*?)<\/p>/, "hero paragraph")[0],
      quoteButton: one(src, />\s*(Get my free quote)\s*<\/Link>/, "quote button")[0],
      callButton: one(src, /<a href="tel:[^"]*"[^>]*>\s*(Call:[^<]*)<\/a>/, "call button")[0],
    },
    experience: {
      heading: one(src, /<h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">([\s\S]*?)<\/h2>/, "experience heading")[0],
      paragraphs: [
        one(src, /<p className="text-gray-600 text-base md:text-lg leading-relaxed">([\s\S]*?)<\/p>/, "experience paragraph 1")[0],
        one(src, /<p className="text-gray-600 text-base md:text-lg leading-relaxed font-semibold">([\s\S]*?)<\/p>/, "experience paragraph 2")[0],
      ],
      stats,
      gasSafeCard: { title: safeTitle, number: safeNumber },
    },
    boxes: [
      { title: boxTitles[0], paragraphs: [boxParas[0], boxParas[1]] },
      {
        title: boxTitles[1],
        paragraphs: [boxParas[2]],
        badge: one(src, /<span className="text-xs font-semibold text-\[#027cc1\][^"]*">\s*([\s\S]*?)<\/span>/, "badge")[0],
      },
    ],
    inspection: {
      heading: one(src, /<h2 className="text-3xl font-bold text-\[#027cc1\]">(What Does[^<]*)<\/h2>/, "inspection heading")[0],
      subtitle: one(src, /<p className="text-gray-500 mt-2">([\s\S]*?)<\/p>/, "inspection subtitle")[0],
      cards: many(src, /<h3 className="font-bold text-lg text-gray-950 mb-2">([^<]*)<\/h3>\s*<p className="text-gray-600 text-sm leading-relaxed">([^<]*)<\/p>/g, "inspection cards", 5).map(([t, d]) => ({ title: t, desc: d })),
    },
    coverage: {
      heading: one(src, /<h2 className="text-3xl font-bold text-\[#027cc1\]">(Where We Cover)<\/h2>/, "coverage heading")[0],
      columns: many(src, /<th className="p-4 font-semibold">([^<]*)<\/th>/g, "table columns", 3).map((r) => r[0]),
      rows: many(src, /<tr className="hover:bg-gray-50 transition">([\s\S]*?)<\/tr>/g, "table rows", 3).map(([row]) =>
        [...row.matchAll(/<td[^>]*>([^<]*)<\/td>/g)].map((m) => clean(m[1]))
      ),
    },
    faqHeading: one(src, /<h2 className="text-3xl font-bold text-black">([^<]*)<\/h2>/, "faq heading")[0],
    faqs: jsArray(src, "faqs").map((f) => ({ q: clean(f.q), a: clean(f.a) })),
    reviews: {
      heading: one(src, /<h2 className="text-3xl font-bold text-\[#027cc1\] text-center mb-12">([\s\S]*?)<\/h2>/, "reviews heading")[0],
      items: many(src, /<p className="text-gray-600 italic mb-4">\s*"([\s\S]*?)"\s*<\/p>\s*<h4 className="font-bold text-\[#027cc1\]">—\s*([^<]*)<\/h4>/g, "reviews", 4).map(([quote, author]) => ({ quote, author })),
    },
  };
}

// ---------- Pages ----------
// path = website ka route. Page ki file app<path>/page.jsx par honi chahiye.
const PAGES = [
  { id: "about-us", name: "About Us", path: "/about-us", extract: extractAbout },
  { id: "about", name: "About (Why Choose Us)", path: "/about", extract: extractAbout },
  { id: "contact", name: "Contact Us", path: "/contact", extract: extractContact },
  {
    id: "landlord-gas-safety",
    name: "Landlord Gas Safety Certificate",
    path: opt("--landlord-path") || "",
    extract: extractLandlord,
  },
];

const emptySeo = () => ({
  meta_title: "", meta_description: "", canonical_url: "", robots: "",
  og_title: "", og_description: "", og_image: "", image_alt_text: "", schema_jsonld: "",
});

// ---------- run ----------
const outDir = join(ROOT, "scripts", "body");
mkdirSync(outDir, { recursive: true });
const ready = [];
let bad = 0;

console.log("\nPage".padEnd(26), "status");
for (const p of PAGES) {
  if (!p.path) {
    console.log(p.id.padEnd(25), "SKIPPED: route set nahi (--landlord-path /route ya PAGES mein path likho)");
    bad++;
    continue;
  }
  const file = ["page.jsx", "page.js"].map((f) => join(ROOT, "app", ...p.path.split("/").filter(Boolean), f)).find(existsSync);
  if (!file) {
    console.log(p.id.padEnd(25), `PROBLEM: app${p.path}/page.jsx nahi mili (route sahi hai?)`);
    bad++;
    continue;
  }
  try {
    const body = p.extract(readFileSync(file, "utf8").replace(/\r\n/g, "\n"));
    writeFileSync(join(outDir, `${p.id}.json`), JSON.stringify(body, null, 2) + "\n");
    console.log(p.id.padEnd(25), "ok  ->", `scripts/body/${p.id}.json`);
    ready.push({ ...p, body });
  } catch (err) {
    console.log(p.id.padEnd(25), "PROBLEM:", err.message);
    bad++;
  }
}

if (SEED) {
  if (!process.env.DATABASE_URL) {
    console.error("\nDATABASE_URL nahi mili. Chalao: node --env-file=.env.local scripts/seed-other-pages.mjs --seed");
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
    const existing = await col.findOne({ id: p.id }, { projection: { _id: 0, body: 1 } });
    if (!existing) {
      await col.insertOne({
        id: p.id, path: p.path, name: p.name, status: "published", version: "1",
        seo: emptySeo(), body: p.body, updated_at: now,
      });
      console.log(" ", p.id.padEnd(24), "naya page bana (SEO khali, body saved)");
    } else if (!existing.body || FORCE) {
      await col.updateOne({ id: p.id }, { $set: { body: p.body, updated_at: now } });
      console.log(" ", p.id.padEnd(24), "body saved (SEO ko haath nahi lagaya)");
    } else {
      console.log(" ", p.id.padEnd(24), "skipped: body pehle se hai (overwrite ke liye --force)");
    }
  }
  await client.close();
}

if (bad) {
  console.log(`\n${bad} page(s) mein masla hai, unka body save nahi hua.`);
  process.exit(1);
}
