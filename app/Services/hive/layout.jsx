import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/lib/JsonLd";

export const generateMetadata = () => buildMetadata("services-hive");

export default function ServiceLayout({ children }) {
  return (
    <>
      <JsonLd id="services-hive" />
      {children}
    </>
  );
}
