import { getPageCached } from "@/lib/pageCache";
import NestClient from "./NestClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function NestPage() {
  let content = null;

  try {
    const page = await getPageCached("services-nest");
    content = page?.body ?? null;
  } catch (err) {
    console.error("nest page: could not load body", err);
    content = null;
  }

  return <NestClient content={content} />;
}