// Har Services/<slug>/page.jsx se text arrays (serviceDetails, faqs ...) nikaal kar JSON banata hai.
//
//   node scripts/extract-body.mjs                 -> sirf JSON files banata hai (scripts/body/<slug>.json), DB ko haath nahi lagata
//   node --env-file=.env.local scripts/extract-body.mjs --seed          -> DB mein `body` field bhi likhta hai (jis page mein body nahi hai)
//   ... --seed --force                            -> jin pages mein body pehle se hai unhe bhi overwrite karta hai
//   ... --only hive                               -> sirf ek page
//   ... --root D:\ar-project                      -> project ka folder (default: abhi wala folder)
//
// DB mein text aur har tab ki image ka path jata hai (boiler ke body jaisa). Icons, className, hero/CTA code mein rehte hain.

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
const ONLY = opt("--only");

const SLUGS = [
  "boiler", "boiler-breakdown", "boiler-installation", "central-heating", "dishwasher",
  "emergency-services", "gas-cooker", "general-installation", "general-plumbing",
  "heating-installation", "hive", "landlord", "megaflo", "nest", "power-flushing",
  "thermostat-installation", "underfloor-heating", "washing-machine",
];

// Alag pages mein tabs wali array ka naam alag hai; DB mein sab `serviceDetails` ban jati hain
const SECTION_ARRAYS = ["serviceDetails", "repairServices", "heatingServices"];
const SECTION_KEYS = ["title", "tab", "image", "paras", "list", "parasAfter", "alt"];
const IGNORED_KEYS = ["customLayout"]; // code mein rehta hai
// Page-specific extra arrays (naam waisa hi rakha)
const EXTRA_ARRAYS = ["boilerData", "checkCovers"];

// ---------- array dhoondna (strings aur comments ka dhyan rakh ke bracket match) ----------
function findArray(src, name) {
  const m = new RegExp(`(?:const|let|var)\\s+${name}\\s*=\\s*\\[`).exec(src);
  if (!m) return null;
  const start = m.index + m[0].length - 1; // '[' ki jagah
  let depth = 0;
  let mode = null; // null | '"' | "'" | '`' | 'line' | 'block'
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    const n = src[i + 1];
    if (mode === "line") { if (c === "\n") mode = null; continue; }
    if (mode === "block") { if (c === "*" && n === "/") { mode = null; i++; } continue; }
    if (mode) {
      if (c === "\\") { i++; continue; }
      if (mode === "`" && c === "$" && n === "{") throw new Error(`${name}: template literal with \${} is not supported`);
      if (c === mode) mode = null;
      continue;
    }
    if (c === "/" && n === "/") { mode = "line"; i++; continue; }
    if (c === "/" && n === "*") { mode = "block"; i++; continue; }
    if (c === '"' || c === "'" || c === "`") { mode = c; continue; }
    if (c === "[") depth++;
    else if (c === "]") {
      depth--;
      if (depth === 0) return src.slice(start, i + 1);
    }
  }
  throw new Error(`${name}: array ka end nahi mila`);
}

function evalArray(text, name) {
  try {
    const v = vm.runInNewContext(`(${text})`, Object.create(null), { timeout: 1000 });
    return JSON.parse(JSON.stringify(v));
  } catch (err) {
    throw new Error(`${name}: array parh nahi saka (${err.message}). Is mein JSX ya function to nahi?`);
  }
}

const isStr = (v) => typeof v === "string" && v.trim().length > 0;
const trimAll = (v) => (typeof v === "string" ? v.trim() : Array.isArray(v) ? v.map(trimAll) : v);

// ---------- ek page ----------
function extractPage(slug) {
  const problems = [];
  const warnings = [];
  const file = ["page.jsx", "page.js"].map((f) => join(ROOT, "app", "Services", slug, f)).find(existsSync);
  if (!file) return { slug, problems: [`page file nahi mili: app/Services/${slug}/page.jsx`], warnings };

  const src = readFileSync(file, "utf8");
  const body = {};

  try {
    // tabs / sections
    const secName = SECTION_ARRAYS.find((n) => new RegExp(`(?:const|let|var)\\s+${n}\\s*=\\s*\\[`).test(src));
    if (!secName) {
      problems.push(`tabs wali array nahi mili (${SECTION_ARRAYS.join(" / ")})`);
    } else {
      const raw = evalArray(findArray(src, secName), secName);
      const blockText = findArray(src, "blockImages");
      const blockImages = blockText ? evalArray(blockText, "blockImages") : [];
      body.serviceDetails = raw.map((s, i) => {
        // Kuch pages image har tab mein likhte hain, kuch blockImages[i] se leti hain
        if (!s.image && blockImages.length) s = { ...s, image: blockImages[i % blockImages.length] };
        const out = {};
        for (const k of SECTION_KEYS) if (s[k] !== undefined) out[k] = trimAll(s[k]);
        const extra = Object.keys(s).filter((k) => !SECTION_KEYS.includes(k) && !IGNORED_KEYS.includes(k));
        if (extra.length) warnings.push(`section ${i + 1}: in keys ko chhoda: ${extra.join(", ")}`);
        const where = `section ${i + 1}`;
        if (!isStr(out.title)) problems.push(`${where}: title khali`);
        if (!isStr(out.tab)) problems.push(`${where}: tab khali`);
        if (!isStr(out.alt)) problems.push(`${where}: alt khali`);
        if (!isStr(out.image)) problems.push(`${where}: image nahi mili (na tab mein, na blockImages mein)`);
        if (!out.paras && !out.list) problems.push(`${where}: na paras na list`);
        for (const k of ["paras", "list", "parasAfter"]) {
          if (out[k] !== undefined && !(Array.isArray(out[k]) && out[k].length && out[k].every(isStr))) {
            problems.push(`${where}: ${k} sahi array of text nahi`);
          }
        }
        return out;
      });
      if (secName !== "serviceDetails") warnings.push(`"${secName}" ko "serviceDetails" naam diya`);
    }

    // faqs
    const faqText = findArray(src, "faqs");
    if (!faqText) {
      problems.push("faqs array nahi mili");
    } else {
      body.faqs = evalArray(faqText, "faqs").map((f, i) => {
        const out = { q: trimAll(f.q), a: trimAll(f.a) };
        if (!isStr(out.q) || !isStr(out.a)) problems.push(`faq ${i + 1}: q ya a khali`);
        return out;
      });
    }

    // page-specific extras
    for (const name of EXTRA_ARRAYS) {
      const t = findArray(src, name);
      if (t) body[name] = trimAll(evalArray(t, name));
    }
  } catch (err) {
    problems.push(err.message);
  }

  return { slug, body, problems, warnings };
}

// ---------- chalao ----------
const slugs = ONLY ? [ONLY] : SLUGS;
const results = slugs.map(extractPage);
const outDir = join(ROOT, "scripts", "body");
mkdirSync(outDir, { recursive: true });

console.log("\nPage".padEnd(28), "tabs".padStart(5), "faqs".padStart(5), "  status");
let bad = 0;
for (const r of results) {
  if (r.problems.length) {
    bad++;
    console.log(r.slug.padEnd(27), "".padStart(5), "".padStart(5), "  PROBLEM");
    r.problems.forEach((p) => console.log("    -", p));
  } else {
    writeFileSync(join(outDir, `${r.slug}.json`), JSON.stringify(r.body, null, 2) + "\n");
    console.log(
      r.slug.padEnd(27),
      String(r.body.serviceDetails.length).padStart(5),
      String(r.body.faqs.length).padStart(5),
      "  ok"
    );
  }
  r.warnings.forEach((w) => console.log("    note:", w));
}
console.log(`\nJSON files: ${outDir}`);

if (SEED) {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL nahi mili. Chalao: node --env-file=.env.local scripts/extract-body.mjs --seed");
    process.exit(1);
  }
  const { MongoClient } = await import("mongodb");
  const client = new MongoClient(process.env.DATABASE_URL);
  await client.connect();
  const col = client.db().collection("pages");
  console.log("\nDB seed:");
  for (const r of results.filter((x) => !x.problems.length)) {
    const id = `services-${r.slug}`;
    const filter = FORCE ? { id } : { id, body: { $exists: false } };
    const res = await col.updateOne(filter, { $set: { body: r.body, updated_at: new Date().toISOString() } });
    if (res.matchedCount) {
      console.log(" ", id.padEnd(36), "body saved");
    } else if (await col.findOne({ id }, { projection: { _id: 1 } })) {
      console.log(" ", id.padEnd(36), "skipped: body pehle se hai (overwrite ke liye --force)");
    } else {
      console.log(" ", id.padEnd(36), "SKIPPED: DB mein ye page hi nahi hai");
    }
  }
  await client.close();
}

if (bad) {
  console.log(`\n${bad} page(s) mein problem hai, unka body save nahi hua.`);
  process.exit(1);
}
