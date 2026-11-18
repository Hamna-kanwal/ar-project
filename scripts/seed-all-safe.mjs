
import { MongoClient } from "mongodb";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pages as servicePages, SITE } from "./seo-data.mjs";

const APPLY = process.argv.includes("--apply");
const ROOT = process.cwd();
const client = new MongoClient(process.env.DATABASE_URL);

const extraPages = [
  { id: "about-us", path: "/about-us", name: "About Us" },
  { id: "about", path: "/about", name: "About" },
  { id: "contact", path: "/contact", name: "Contact" },
  {
    id: "landlord-gas-safety",
    path: "/landlord-certificate",
    name: "Landlord Gas Safety",
  },
];

const heroScripts = [
  "scripts/seed-heroes.mjs",
  "scripts/seed-heroes-batch1.mjs",
  "scripts/seed-heroes-batch2.mjs",
  "scripts/seed-heroes-batch3.mjs",
  "scripts/seed-heroes-batch4.mjs",
  "scripts/seed-hive-hero.mjs",
];

function missing(value) {
  return value === undefined || value === null;
}

// Existing values always win. Missing nested object keys are filled.
function mergeMissing(existing, incoming) {
  if (missing(existing)) return incoming;
  if (missing(incoming)) return existing;

  if (
    typeof existing === "object" &&
    typeof incoming === "object" &&
    !Array.isArray(existing) &&
    !Array.isArray(incoming)
  ) {
    const result = { ...incoming, ...existing };

    for (const key of Object.keys(incoming)) {
      result[key] = mergeMissing(existing[key], incoming[key]);
    }

    return result;
  }

  // Preserve existing arrays, strings, numbers and booleans.
  return existing;
}

function missingPatch(existing, incoming, prefix = "") {
  const patch = {};

  if (
    incoming &&
    typeof incoming === "object" &&
    !Array.isArray(incoming)
  ) {
    for (const [key, value] of Object.entries(incoming)) {
      const field = prefix ? `${prefix}.${key}` : key;
      const oldValue = existing?.[key];

      if (
        value &&
        typeof value === "object" &&
        !Array.isArray(value)
      ) {
        Object.assign(
          patch,
          missingPatch(oldValue || {}, value, field)
        );
      } else if (missing(oldValue)) {
        patch[field] = value;
      }
    }
  }

  return patch;
}

function runScript(file, args = []) {
  const fullPath = path.join(ROOT, file);

  if (!existsSync(fullPath)) {
    throw new Error(`Required script not found: ${file}`);
  }

  console.log(`\nRunning ${file}`);

  const result = spawnSync(
    process.execPath,
    ["--env-file=.env.local", file, ...args],
    { cwd: ROOT, stdio: "inherit" }
  );

  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${file} failed with exit code ${result.status}`);
  }
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing.");
  process.exit(1);
}

if (!APPLY) {
  console.log("DRY RUN: No database changes.");
  console.log("Service pages:", servicePages.length);
  console.log("Additional pages:", extraPages.length);
  console.log(
    "Body JSON files:",
    servicePages.length + extraPages.length
  );
  console.log("Hero scripts:", heroScripts.length);
  console.log("Blogs listing SEO: seed-blogs-page.mjs");
  console.log("Other page SEO: seed-other-seo.mjs");
  console.log("\nTo apply, run with --apply.");
  process.exit(0);
}

await client.connect();

try {
  const db = client.db();
  const collection = db.collection("pages");

  await collection.createIndex({ id: 1 }, { unique: true });

  const now = new Date().toISOString();

  console.log("\n========== SERVICE PAGE RECORDS ==========");

  for (const page of servicePages) {
    const id = `services-${page.slug}`;

    const doc = {
      id,
      path: `/Services/${page.slug}`,
      name: page.name,
      status: "published",
      version: "1",
      seo: {
        meta_title: page.title,
        meta_description: page.description,
        canonical_url: `${SITE}/Services/${page.slug}`,
        robots: "",
        og_title: page.title,
        og_description: page.description,
        og_image: page.image,
        image_alt_text: "",
        schema_jsonld: "",
      },
      updated_at: now,
    };

    const result = await collection.updateOne(
      { id },
      { $setOnInsert: doc },
      { upsert: true }
    );

    console.log(
      result.upsertedCount ? `INSERTED ${id}` : `EXISTS ${id}`
    );
  }

  console.log("\n========== OTHER PAGE RECORDS ==========");

  for (const page of extraPages) {
    const result = await collection.updateOne(
      { id: page.id },
      {
        $setOnInsert: {
          ...page,
          status: "published",
          version: "1",
          seo: {
            meta_title: "",
            meta_description: "",
            canonical_url: `${SITE}${page.path}`,
            robots: "",
            og_title: "",
            og_description: "",
            og_image: "",
            image_alt_text: "",
            schema_jsonld: "",
          },
          updated_at: now,
        },
      },
      { upsert: true }
    );

    console.log(
      result.upsertedCount
        ? `INSERTED ${page.id}`
        : `EXISTS ${page.id}`
    );
  }

  console.log("\n========== BODY JSON MERGE ==========");

  const bodyPages = [
    ...servicePages.map((page) => ({
      id: `services-${page.slug}`,
      file: page.slug,
    })),
    ...extraPages.map((page) => ({
      id: page.id,
      file: page.id,
    })),
  ];

  let bodyInserted = 0;
  let bodySkipped = 0;

  for (const page of bodyPages) {
    const file = path.join(
      ROOT,
      "scripts",
      "body",
      `${page.file}.json`
    );

    if (!existsSync(file)) {
      console.log(`MISSING JSON: ${page.file}.json`);
      bodySkipped++;
      continue;
    }

    const body = JSON.parse(await readFile(file, "utf8"));

    const current = await collection.findOne(
      { id: page.id },
      { projection: { body: 1 } }
    );

    if (!current) {
      console.log(`PAGE NOT FOUND: ${page.id}`);
      bodySkipped++;
      continue;
    }

    const patch = missingPatch(current.body || {}, body);

    if (Object.keys(patch).length === 0) {
      console.log(`BODY EXISTS: ${page.id}`);
      bodySkipped++;
      continue;
    }

    const updates = {};

    for (const [key, value] of Object.entries(patch)) {
      updates[`body.${key}`] = value;
    }

    await collection.updateOne(
      { id: page.id },
      { $set: { ...updates, updated_at: now } }
    );

    console.log(`BODY MERGED: ${page.id}`);
    bodyInserted++;
  }

  console.log("\n========== OTHER PAGE SEO ==========");

  runScript("scripts/seed-other-seo.mjs", ["--seed"]);

  console.log("\n========== BLOG LISTING SEO ==========");

  runScript("scripts/seed-blogs-page.mjs");

  console.log("\n========== HERO DATA ==========");

  // Save current hero-related fields in memory.
  // After running original hero scripts, merge old values back
  // while retaining any newly added missing fields.
  const beforeHero = await collection
    .find(
      {},
      {
        projection: {
          id: 1,
          "body.hero": 1,
          "body.trustItems": 1,
          "body.faqSection": 1,
        },
      }
    )
    .toArray();

  let heroError = null;

  try {
    for (const script of heroScripts) {
      runScript(script);
    }
  } catch (error) {
    heroError = error;
  }

  for (const oldDoc of beforeHero) {
    const current = await collection.findOne(
      { id: oldDoc.id },
      {
        projection: {
          "body.hero": 1,
          "body.trustItems": 1,
          "body.faqSection": 1,
        },
      }
    );

    if (!current) continue;

    const restore = {};

    for (const field of ["hero", "trustItems", "faqSection"]) {
      const oldValue = oldDoc.body?.[field];
      const newValue = current.body?.[field];

      if (!missing(oldValue)) {
        restore[`body.${field}`] = mergeMissing(
          oldValue,
          newValue
        );
      }
    }

    if (Object.keys(restore).length) {
      await collection.updateOne(
        { id: oldDoc.id },
        { $set: restore }
      );
    }
  }

  if (heroError) throw heroError;

  console.log("\n========== COMPLETE ==========");
  console.log("New page records inserted safely.");
  console.log("Body fields merged where missing.");
  console.log("Existing SEO values preserved.");
  console.log("Hero data merged with existing values preserved.");
  console.log("Existing published blogs were not modified.");
  console.log("Existing pending changes were not modified.");
  console.log("Body JSON merged:", bodyInserted);
  console.log("Body skipped:", bodySkipped);

} catch (error) {
  console.error("\nSEED FAILED:", error);
  process.exitCode = 1;
} finally {
  await client.close();
}
