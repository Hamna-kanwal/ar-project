import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/lib/JsonLd";

export const generateMetadata = () => buildMetadata("landlord-gas-safety");

export default function LandlordLayout({ children }) {
  return (
    <>
      <JsonLd id="landlord-gas-safety" />
      {children}
    </>
  );
}