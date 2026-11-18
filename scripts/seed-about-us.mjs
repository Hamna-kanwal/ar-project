
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const SEED = args.includes("--seed");
const FORCE = args.includes("--force");

const ROOT = ".";
const PAGE_ID = "about-us";
const PAGE_PATH = "/about-us";
const PAGE_NAME = "About Us";

const clean = (value) =>
  value.replace(/\s+/g, " ").trim();

function one(src, regex, label) {
  const match = regex.exec(src);

  if (!match) {
    throw new Error(`"${label}" page.jsx mein nahi mila`);
  }

  return clean(match[1]);
}

function many(src, regex, label, expected) {
  const rows = [...src.matchAll(regex)].map((match) =>
    match.slice(1).map(clean)
  );

  if (rows.length !== expected) {
    throw new Error(
      `"${label}": ${expected} items expected thay, ${rows.length} mile`
    );
  }

  return rows;
}

function extractAboutUs(src) {
  return {
    hero: {
      title: one(
        src,
        /<h1[^>]*>\s*([^<]*?)\s*<span[^>]*>/,
        "hero title"
      ),
      titleHighlight: one(
        src,
        /<h1[^>]*>[\s\S]*?<span[^>]*>([^<]*)<\/span>/,
        "hero title highlight"
      ),
      paragraph: one(
        src,
        /<p className="text-lg text-gray-800[^"]*">([\s\S]*?)<\/p>/,
        "hero paragraph"
      ),
    },

    intro: {
      heading: one(
        src,
        /<h2 className="text-4xl font-bold text-\[#027cc1\] mb-3">([\s\S]*?)<\/h2>/,
        "intro heading"
      ),

      paragraph: one(
        src,
        /<p className="text-gray-600\s+leading-relaxed mb-3">([\s\S]*?)<\/p>/,
        "intro paragraph"
      ),

      highlights: many(
        src,
        /<(?:ShieldCheck|Award) className="text-orange-500"\s*\/>\s*([^<]+)<\/div>/g,
        "highlights",
        2
      ).map(([text]) => text),

      closing: one(
        src,
        /<p className="text-gray-600 mb-6 leading-relaxed">([\s\S]*?)<\/p>/,
        "intro closing"
      ),

      button: one(
        src,
        /<button[^>]*>([\s\S]*?)<\/button>/,
        "intro button"
      ),
    },

    stats: many(
      src,
      /val:\s*"([^"]*)",\s*label:\s*"([^"]*)"/g,
      "stats",
      3
    ).map(([value, label]) => ({
      value,
      label,
    })),

    why: {
      heading: one(
        src,
        /<h2 className="text-3xl font-bold text-center mb-12">([\s\S]*?)<\/h2>/,
        "why heading"
      ),

      paragraph: one(
        src,
        /<h2 className="text-3xl font-bold text-center mb-12">[\s\S]*?<\/h2>\s*<p>([\s\S]*?)<\/p>/,
        "why paragraph"
      ),
    },

    features: many(
      src,
      /\{\s*title:\s*"([^"]*)",\s*desc:\s*"([^"]*)"/g,
      "features",
      4
    ).map(([title, desc]) => ({
      title,
      desc,
    })),
  };
}

const emptySeo = () => ({
  meta_title: "",
  meta_description: "",
  canonical_url: "",
  robots: "",
  og_title: "",
  og_description: "",
  og_image: "",
  image_alt_text: "",
  schema_jsonld: "",
});

async function main() {
  const pageFile = join(ROOT, "app", "about-us", "page.jsx");

  if (!existsSync(pageFile)) {
    throw new Error("app/about-us/page.jsx nahi mili. Route check karo.");
  }

  const source = readFileSync(pageFile, "utf8").replace(/\r\n/g, "\n");

  const body = extractAboutUs(source);

  const outputDir = join(ROOT, "scripts", "body");
  mkdirSync(outputDir, { recursive: true });

  const outputFile = join(outputDir, `${PAGE_ID}.json`);

  writeFileSync(
    outputFile,
    JSON.stringify(body, null, 2) + "\n"
  );

  console.log("About Us JSON successfully generated:");
  console.log("scripts/body/about-us.json");

  if (!SEED) {
    console.log("\nJSON generate ho gaya. Database update nahi hui.");
    return;
  }

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL nahi mili. .env.local check karo.");
  }

  const { MongoClient } = await import("mongodb");
  const client = new MongoClient(process.env.DATABASE_URL);

  try {
    await client.connect();

    const collection = client.db().collection("pages");

    await collection.createIndex({ id: 1 }, { unique: true });

    const existing = await collection.findOne(
      { id: PAGE_ID },
      { projection: { _id: 0, body: 1 } }
    );

    const now = new Date().toISOString();

    if (!existing) {
      await collection.insertOne({
        id: PAGE_ID,
        path: PAGE_PATH,
        name: PAGE_NAME,
        status: "published",
        version: "1",
        seo: emptySeo(),
        body,
        updated_at: now,
      });

      console.log("About Us page database mein create ho gaya.");
    } else if (!existing.body || FORCE) {
      await collection.updateOne(
        { id: PAGE_ID },
        {
          $set: {
            body,
            updated_at: now,
          },
        }
      );

      console.log("About Us body successfully update ho gayi.");
      console.log("Existing SEO fields unchanged hain.");
    } else {
      console.log("Skipped: About Us body pehle se database mein mojood hai.");
      console.log("Overwrite ke liye --force use karo.");
    }
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error("\nSEED ERROR:", error.message);
  process.exit(1);
});
