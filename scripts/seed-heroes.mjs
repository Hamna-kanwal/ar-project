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
  "services-nest": {
    image: "/nest4.webp",
    imageAlt: "Google Nest installation background",
    badge: "Gas Safe No. 574111 | App set up on your phone | Fixed price before we start",
    title: "Nest Installation",
    titleHighlight: "in Watford",
    paragraph:
      "Google Nest learns your routine and adjusts your heating to suit you. Our Gas Safe engineers fit Nest, link the app to your phone and test it with your boiler, so it is ready to use the moment we leave.",
    ...phone,
  },
  "services-thermostat-installation": {
    image: "/installation1.webp",
    imageAlt: "Thermostat installation background",
    badge: "Gas Safe No. 574111 | Full set up included | Fixed price before we start",
    title: "Thermostat and Smart Thermostat",
    titleHighlight: "Installation in Watford",
    paragraph:
      "The right thermostat puts you in control of your heating and your bills. We fit simple room thermostats, programmable and wireless models, and smart controls such as Hive and Google Nest, then set everything up and show you how it works.",
    ...phone,
  },
  "services-power-flushing": {
    image: "/power1.webp",
    imageAlt: "Power flushing heating system in Watford background",
    badge: "Gas Safe No. 574111 | Most flushes done in a few hours | Fixed price before we start",
    title: "Power Flushing",
    titleHighlight: "in Watford",
    paragraph:
      "Cold spots on your radiators or a noisy boiler? Sludge is the likely cause. A power flush clears sludge, rust and debris from your heating system, so your radiators heat evenly again and your boiler does not have to work so hard.",
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