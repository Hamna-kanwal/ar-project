import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/lib/JsonLd";

export const generateMetadata = () => buildMetadata("services-power-flushing");

export default function ServiceLayout({ children }) {
  return (
    <>
      <JsonLd id="services-power-flushing" />
      {children}
    </>
  );
}
