import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/lib/JsonLd";

export const generateMetadata = () => buildMetadata("services-washing-machine");

export default function ServiceLayout({ children }) {
  return (
    <>
      <JsonLd id="services-washing-machine" />
      {children}
    </>
  );
}
