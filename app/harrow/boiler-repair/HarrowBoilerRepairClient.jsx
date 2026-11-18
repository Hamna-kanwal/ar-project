"use client";
import HarrowPageClient from "../../Services/_shared/HarrowPageClient";
import defaults from "../_defaults/harrow-boiler-repair.json";

const config = {
  schemaName: "Boiler Repair in Harrow",
  serviceType: "Boiler repair",
  whatsappTitle: "Boiler repair Harrow request",
  jobSummaryLabel: "Boiler make",
  jobLabel: "Boiler make (optional)",
  jobPlaceholder: "e.g. Worcester Bosch",
  imageFit: "cover",
  relatedIcons: ["cert", "wrench", "drop"],
};

export default function HarrowBoilerRepairClient({ content }) {
  return <HarrowPageClient content={content} defaults={defaults} config={config} />;
}