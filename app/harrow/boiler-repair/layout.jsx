import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/lib/JsonLd";

export const generateMetadata = () => buildMetadata("harrow-boiler-repair");

export default function HarrowBoilerRepairLayout({ children }) {
  return (
    <>
      <JsonLd id="harrow-boiler-repair" />
      {children}
    </>
  );
}