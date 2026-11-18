import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/lib/JsonLd";

export const generateMetadata = () => buildMetadata("services-central-heating");

export default function ServiceLayout({ children }) {
  return (
    <>
      <JsonLd id="services-central-heating" />
      {children}
    </>
  );
}
