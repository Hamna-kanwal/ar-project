import { getPageCached } from "@/lib/pageCache";
import BoilerInstallationClient from "./BoilerInstallationClient";

// Always read fresh content so approved edits show up without a rebuild
export const dynamic = "force-dynamic";

export default async function BoilerInstallationPage() {
  let content = null;

  try {
    const page = await getPageCached("services-boiler-installation");
    content = page?.body ?? null;
  } catch (err) {
    console.error("boiler installation page: could not load body", err);
    content = null;
  }

  return <BoilerInstallationClient content={content} />;
}
