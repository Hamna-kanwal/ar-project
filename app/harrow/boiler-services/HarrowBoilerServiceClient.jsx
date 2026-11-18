"use client";
import HarrowPageClient from "../../Services/_shared/HarrowPageClient";
import defaults from "../_defaults/harrow-boiler-service.json";

const config = {
  schemaName: "Boiler Service in Harrow",
  serviceType: "Boiler service",
  whatsappTitle: "Boiler service Harrow request",
  jobSummaryLabel: "Boiler make",
  jobLabel: "Boiler make (optional)",
  jobPlaceholder: "e.g. Worcester Bosch",
  imageFit: "contain",
  relatedIcons: ["wrench", "cert", "drop"],
};

export default function HarrowBoilerServiceClient({ content }) {
  return <HarrowPageClient content={content} defaults={defaults} config={config} />;
}