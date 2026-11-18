import { getPageCached } from "@/lib/pageCache";
import ContactClient from "./ContactClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function ContactPage() {
  let content = null;

  try {
    const page = await getPageCached("contact");
    content = page?.body ?? null;
  } catch (err) {
    console.error("contact page: could not load body", err);
    content = null;
  }

  return <ContactClient content={content} />;
}