import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/lib/JsonLd";

export const generateMetadata = () => buildMetadata("harrow-boiler-service");

export default function HarrowBoilerServiceLayout({ children }) {
  return (
    <>
      <JsonLd id="harrow-boiler-service" />
      {children}
    </>
  );
}