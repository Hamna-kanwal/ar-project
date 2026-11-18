import { getPageCached } from "@/lib/pageCache";
import AboutUsClient from "../about/AboutBreakdownClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function AboutPage() {
  let content = null;

  try {
    const page = await getPageCached("about");
    content = page?.body ?? null;
  } catch (err) {
    console.error("about page: could not load body", err);
    content = null;
  }

  return <AboutUsClient content={content} showRelated={false} />;
}