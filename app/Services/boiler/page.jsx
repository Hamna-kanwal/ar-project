import { getPageCached } from "@/lib/pageCache";
import BoilerClient from "./BoilerClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function BoilerPage() {
  let content = null;

  try {
    const page = await getPageCached("services-boiler");
    // Only the plain body object is passed to the client component
    content = page?.body ?? null;
  } catch (err) {
    console.error("boiler page: could not load body", err);
    content = null;
  }

  return <BoilerClient content={content} />;
}