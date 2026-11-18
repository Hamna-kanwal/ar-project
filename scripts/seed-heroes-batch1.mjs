import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URL);
await client.connect();
const col = client.db().collection("pages");

const trustItems = [
  "Gas Safe No. 574111",
  "Local since 2007",
  "Fixed price before we start",
  "Open 7 days a week",
];

const faqSection = {
  eyebrow: "FAQ",
  title: "Frequently Asked Questions",
  subtitle: "Still unsure? Call or WhatsApp us and we will help.",
};

const phone = {
  callLabel: "Call:",
  phoneDisplay: "+44 7800 657141",
  phoneTel: "+447800657141",
  primaryButton: "Get my free quote",
};

const heroes = {
  "services-boiler-breakdown": {
    image: "/boiler.webp",
    imageAlt: "Boiler breakdown repair in Watford",
    badge: "Gas Safe No. 574111 | Local since 2007 | Emergency visits in 60 to 90 minutes",
    title: "Boiler Repair",
    titleHighlight: "in Watford",
    paragraph:
      "Boiler stopped working? Our Gas Safe engineers (No. 574111) come out, find the fault and fix many problems on the first visit, as our vans carry common parts. You get a fixed price before any work starts, and an honest answer on repair or replace.",
    ...phone,
  },
  "services-central-heating": {
    image: "/heatingstallation1.webp",
    imageAlt: "Central heating system installation background",
    badge: "Gas Safe No. 574111 | Local since 2007 | Fixed price before we start",
    title: "Central Heating",
    titleHighlight: "System Installation",
    paragraph:
      "A central heating system warms your whole home from one boiler. Our Gas Safe engineers (No. 574111) design the system around your home, then fit the boiler, pipework, radiators and controls, and balance every radiator so heat spreads evenly.",
    ...phone,
  },
  "services-heating-installation": {
    image: "/boiler.webp",
    imageAlt: "Heating engineer installing heating in Watford",
    badge: "Gas Safe No. 574111 | Local since 2007 | Fixed price before we start",
    title: "Heating Installation",
    titleHighlight: "in Watford",
    paragraph:
      "A good heating system warms every room and keeps your bills in check. Our Gas Safe engineers (No. 574111) have planned and fitted heating for Watford homes since 2007. From the boiler to the last radiator, we handle the whole job, give you a fixed price first, and test everything before we go.",
    ...phone,
  },
  "services-general-plumbing": {
    image: "/plumbing1.webp",
    imageAlt: "Plumbing services background",
    badge: "Gas Safe No. 574111 | Local since 2007 | No job too small",
    title: "Plumbers",
    titleHighlight: "in Watford",
    paragraph:
      "From a dripping tap to a burst pipe, our local plumbers fix it properly and leave your home clean. You get a fixed price before any work starts, and no job is too small.",
    ...phone,
  },
};

for (const [id, hero] of Object.entries(heroes)) {
  const res = await col.updateOne(
    { id },
    { $set: { "body.hero": hero, "body.trustItems": trustItems, "body.faqSection": faqSection } }
  );
  console.log(`${id}: ${res.matchedCount ? "hero data saved" : "NOT FOUND"}`);
}

await client.close();