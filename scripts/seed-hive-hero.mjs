import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URL);
await client.connect();
const col = client.db().collection("pages");

const extra = {
  "body.hero": {
    image: "/hive1.webp",
    imageAlt: "Hive thermostat installation background",
    badge: "Gas Safe No. 574111 | App set up on your phone | Fixed price before we start",
    title: "Hive Installation",
    titleHighlight: "in Watford",
    paragraph:
      "Run your heating from your phone with Hive. Our Gas Safe engineers fit Hive on its own or with a new boiler, link the app to your phone and test everything with your boiler before we leave.",
    primaryButton: "Get my free quote",
    callLabel: "Call:",
    phoneDisplay: "+44 7800 657141",
    phoneTel: "+447800657141",
  },
  "body.trustItems": [
    "Gas Safe No. 574111",
    "Local since 2007",
    "Fixed price before we start",
    "Open 7 days a week",
  ],
  "body.faqSection": {
    eyebrow: "FAQ",
    title: "Frequently Asked Questions",
    subtitle: "Still unsure? Call or WhatsApp us and we will help.",
  },
};

const res = await col.updateOne({ id: "services-hive" }, { $set: extra });
console.log(res.matchedCount ? "hive hero data saved" : "services-hive not found");
await client.close();