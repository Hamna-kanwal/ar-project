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

const pages = {
  "services-emergency-services": {
    trustItems: [
      "Gas Safe No. 574111",
      "Local since 2007",
      "Fixed price before we start",
      "Open 24 hours, 7 days a week",
    ],
    hero: {
      image: "/heatingstallation1.webp",
      imageAlt: "Emergency plumber and heating background",
      badge: "Gas Safe No. 574111 | 60 to 90 min response | Open 24/7",
      title: "Emergency Plumber and Heating Engineer",
      titleHighlight: "in Watford",
      // {phone} becomes a clickable phone link on the page
      paragraph:
        "Gas leak, no heating, burst pipe or water pouring through the ceiling? Call us on {phone}. Our Gas Safe engineers aim to reach you in 60 to 90 minutes, make your home safe, find the fault and fix it.",
      ...phone,
      phoneDisplay: "07800 657141",
    },
  },
  "services-megaflo": {
    trustItems,
    hero: {
      image: "/megaflo.webp",
      imageAlt: "Megaflo Unvented Cylinder Installation",
      badge: "Local since 2007 | High Pressure Hot Water | Fixed price before we start",
      title: "Megaflo Unvented",
      titleHighlight: "Cylinder Installation",
      paragraph:
        "A Megaflo cylinder gives you strong hot water at every tap. Run two showers at once with no drop in flow. We fit and test the cylinder, so your hot water stays strong across the home.",
      ...phone,
    },
  },
  "services-underfloor-heating": {
    trustItems,
    hero: {
      image: "/undergroundheating1.webp",
      imageAlt: "Underfloor heating installation background",
      badge: "Gas Safe No. 574111 | Wet and electric systems | Fixed price before we start",
      title: "Underfloor Heating",
      titleHighlight: "in Watford",
      paragraph:
        "Underfloor heating warms a room from the floor up, with no cold spots and no radiators on the walls. We fit wet and electric systems in new builds, extensions and renovated rooms, and set up the controls so you can run them from your phone.",
      ...phone,
    },
  },
};

for (const [id, data] of Object.entries(pages)) {
  const res = await col.updateOne(
    { id },
    { $set: { "body.hero": data.hero, "body.trustItems": data.trustItems, "body.faqSection": faqSection } }
  );
  console.log(`${id}: ${res.matchedCount ? "hero data saved" : "NOT FOUND"}`);
}

await client.close();
