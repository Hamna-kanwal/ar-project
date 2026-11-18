
import { MongoClient } from "mongodb";
import { readFile } from "node:fs/promises";
import { pages as servicePages } from "./seo-data.mjs";

const client = new MongoClient(process.env.DATABASE_URL);

const extraPages = [
  "about-us",
  "about",
  "contact",
  "landlord-gas-safety",
];

const heroPages = [
  "services-nest",
  "services-thermostat-installation",
  "services-power-flushing",
  "services-boiler-breakdown",
  "services-central-heating",
  "services-heating-installation",
  "services-general-plumbing",
  "services-dishwasher",
  "services-washing-machine",
  "services-gas-cooker",
  "services-general-installation",
  "services-emergency-services",
  "services-megaflo",
  "services-underfloor-heating",
  "services-boiler-installation",
  "services-landlord",
  "services-hive",
];

function checkFields(existing, expected, prefix = "") {
  const missing = [];

  for (const [key, value] of Object.entries(expected || {})) {
    const field = prefix ? `${prefix}.${key}` : key;
    const actual = existing?.[key];

    if (actual === undefined || actual === null) {
      missing.push(field);
    } else if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      missing.push(...checkFields(actual, value, field));
    }
  }

  return missing;
}

await client.connect();

try {
  const db = client.db();
  const pagesCol = db.collection("pages");
  const blogsCol = db.collection("blogs");
  const pendingCol = db.collection("pending_changes");

  console.log("\n========== PAGE COUNTS ==========");

  const totalPages = await pagesCol.countDocuments();
  console.log("Total page documents:", totalPages);

  const duplicates = await pagesCol.aggregate([
    {
      $group: {
        _id: "$id",
        count: { $sum: 1 },
      },
    },
    {
      $match: {
        count: { $gt: 1 },
      },
    },
  ]).toArray();

  console.log("Duplicate page IDs:", duplicates.length);

  if (duplicates.length) {
    console.log(duplicates);
  }

  console.log("\n========== SERVICE PAGES ==========");

  let serviceFound = 0;
  let serviceMissing = [];

  for (const page of servicePages) {
    const id = `services-${page.slug}`;
    const doc = await pagesCol.findOne({ id });

    if (doc) {
      serviceFound++;
      console.log("FOUND:", id);

      if (!doc.body) serviceMissing.push(`${id}: body missing`);
    } else {
      serviceMissing.push(`${id}: page missing`);
      console.log("MISSING:", id);
    }
  }

  console.log("Service pages found:", serviceFound, "/", servicePages.length);

  console.log("\n========== OTHER PAGES ==========");

  for (const id of extraPages) {
    const doc = await pagesCol.findOne({ id });

    if (!doc) {
      console.log("MISSING:", id);
      continue;
    }

    console.log(
      "FOUND:",
      id,
      "| Body:",
      doc.body ? "YES" : "NO",
      "| SEO:",
      doc.seo?.meta_title ? "YES" : "CHECK"
    );
  }

  console.log("\n========== BODY JSON VERIFICATION ==========");

  let bodyFilesPassed = 0;
  let bodyFilesFailed = 0;

  const bodyPages = [
    ...servicePages.map((p) => ({
      id: `services-${p.slug}`,
      file: p.slug,
    })),
    ...extraPages.map((id) => ({
      id,
      file: id,
    })),
  ];

  for (const item of bodyPages) {
    const json = JSON.parse(
      await readFile(`scripts/body/${item.file}.json`, "utf8")
    );

    const doc = await pagesCol.findOne(
      { id: item.id },
      { projection: { body: 1 } }
    );

    if (!doc) {
      console.log("FAIL:", item.id, "page missing");
      bodyFilesFailed++;
      continue;
    }

    const missing = checkFields(doc.body || {}, json);

    if (missing.length) {
      console.log("CHECK:", item.id, "missing:", missing.join(", "));
      bodyFilesFailed++;
    } else {
      console.log("PASS:", item.id);
      bodyFilesPassed++;
    }
  }

  console.log("Body passed:", bodyFilesPassed);
  console.log("Body failed:", bodyFilesFailed);

  console.log("\n========== HERO VERIFICATION ==========");

  let heroPassed = 0;
  let heroFailed = 0;

  for (const id of heroPages) {
    const doc = await pagesCol.findOne(
      { id },
      { projection: { "body.hero": 1, "body.trustItems": 1, "body.faqSection": 1 } }
    );

    const ok =
      doc?.body?.hero &&
      doc?.body?.trustItems &&
      doc?.body?.faqSection;

    if (ok) {
      console.log("PASS:", id);
      heroPassed++;
    } else {
      console.log("CHECK:", id, {
        hero: Boolean(doc?.body?.hero),
        trustItems: Boolean(doc?.body?.trustItems),
        faqSection: Boolean(doc?.body?.faqSection),
      });
      heroFailed++;
    }
  }

  console.log("Hero passed:", heroPassed);
  console.log("Hero failed:", heroFailed);

  console.log("\n========== BLOGS ==========");

  console.log("Published blog documents:", await blogsCol.countDocuments());
  console.log("Pending change documents:", await pendingCol.countDocuments());

  console.log("\n========== FINAL SUMMARY ==========");
  console.log("Duplicate page IDs:", duplicates.length);
  console.log("Body passed:", bodyFilesPassed);
  console.log("Body failed:", bodyFilesFailed);
  console.log("Hero passed:", heroPassed);
  console.log("Hero failed:", heroFailed);

} finally {
  await client.close();
}
