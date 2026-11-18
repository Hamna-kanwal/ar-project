import { getPageCached } from "@/lib/pageCache";
import MegafloClient from "./MegafloClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function MegafloPage() {
  let content = null;

  try {
    const page = await getPageCached("services-megaflo");
    content = page?.body ?? null;
  } catch (err) {
    console.error("megaflo page: could not load body", err);
    content = null;
  }

  return <MegafloClient content={content} />;
}
