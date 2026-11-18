import { getPageCached } from "@/lib/pageCache";
import GeneralInstallationClient from "./GeneralInstallationClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function GeneralInstallationPage() {
  let content = null;

  try {
    const page = await getPageCached("services-general-installation");
    content = page?.body ?? null;
  } catch (err) {
    console.error("general installation page: could not load body", err);
    content = null;
  }

  return <GeneralInstallationClient content={content} />;
}
