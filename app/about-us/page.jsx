import { getPageCached } from "@/lib/pageCache";
import AboutUsClient from "./AboutUsClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function AboutUsPage() {
  let content = null;

  try {
    const page = await getPageCached("about-us");
    content = page?.body ?? null;
  } catch (err) {
    console.error("about-us page: could not load body", err);
    content = null;
  }

  return <AboutUsClient content={content} />;
}