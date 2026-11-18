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
  "services-dishwasher": {
    image: "/dishwasher1.webp",
    imageAlt: "Engineer plumbing in a dishwasher in Watford",
    badge: "Local since 2007 | Leak checked before we leave | Fixed price before we start",
    title: "Dishwasher Installation",
    titleHighlight: "in Watford",
    paragraph:
      "New dishwasher? We plumb it in, connect the water and waste, test every joint for leaks and run a cycle before we leave, so it is ready for the first wash. Most fits take under an hour.",
    ...phone,
  },
  "services-washing-machine": {
    image: "/machine1.webp",
    imageAlt: "Washing machine installation background",
    badge: "Local since 2007 | Leak checked before we leave | Fixed price before we start",
    title: "Washing Machine Installation",
    titleHighlight: "in Watford",
    paragraph:
      "New washing machine? We plumb it in, connect the water and waste, test every joint for leaks and run a cycle before we leave, so it is ready for the first load. Most fits take under an hour.",
    ...phone,
  },
  "services-gas-cooker": {
    image: "/gas1.webp",
    imageAlt: "Gas cooker installation background",
    badge: "Gas Safe No. 574111 | Most fits under an hour | Safe to use same day",
    title: "Gas Cooker Installation",
    titleHighlight: "in Watford",
    paragraph:
      "New gas cooker or hob? By law, it must be fitted by a Gas Safe registered engineer. We connect it, test every joint for leaks, check the flame and clean up, so you can cook the same day.",
    ...phone,
  },
  "services-general-installation": {
    image: "/installation1.webp",
    imageAlt: "General installation background",
    badge: "Gas Safe No. 574111 | No job too small | Fixed price before we start",
    title: "General",
    titleHighlight: "Installation in Watford",
    paragraph:
      "From a new tap to a gas hob, our engineers fit it safely and leave your home tidy. We handle small heating, plumbing and appliance jobs which many firms turn down, with a fixed price agreed before we start.",
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
