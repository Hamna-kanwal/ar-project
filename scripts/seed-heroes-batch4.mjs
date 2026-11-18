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

// boilerData and checkCovers are already in the database body, so only the hero fields are set here
const heroes = {
  "services-boiler-installation": {
    image: "/boilerservice1.webp",
    imageAlt: "Boiler installation background",
    badge: "Gas Safe No. 574111 | Combi boilers fitted from £1,800 | Warranties up to 10 years",
    title: "Boiler Installation",
    titleHighlight: "in Watford",
    paragraph:
      "New combi, system and regular boilers fitted by Gas Safe engineers (No. 574111), local to Watford since 2007. We help you pick the right boiler, give you a fixed price before work starts, and finish most fits in one day.",
    ...phone,
  },
  "services-landlord": {
    image: "/landlord1.webp",
    imageAlt: "Landlord Gas Safety Check",
    badge: "Local since 2007 | Fast CP12 Turnaround | Fixed price before we start",
    title: "Landlord",
    titleHighlight: "certificate",
    paragraph:
      "Renting out a home? The law says you need a gas safety check each year. We make the job quick and simple. We check your gas fittings and hand you your certificate, so you stay legal and your tenants stay safe.",
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
