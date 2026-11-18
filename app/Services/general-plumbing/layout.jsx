import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/lib/JsonLd";

export const generateMetadata = () => buildMetadata("services-general-plumbing");

export default function ServiceLayout({ children }) {
  return (
    <>
      <JsonLd id="services-general-plumbing" />
      {children}
    </>
  );
}
