import { getPageCached } from "@/lib/pageCache";
import HeatingInstallationClient from "./HeatingInstallationClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function HeatingInstallationPage() {
  let content = null;

  try {
    const page = await getPageCached("services-heating-installation");
    content = page?.body ?? null;
  } catch (err) {
    console.error("heating installation page: could not load body", err);
    content = null;
  }

  return <HeatingInstallationClient content={content} />;
}