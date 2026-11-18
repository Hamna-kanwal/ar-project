"use client";
import HarrowPageClient from "../../Services/_shared/HarrowPageClient";
import defaults from "../_defaults/harrow-plumber.json";

const config = {
  schemaName: "Plumbers in Harrow",
  serviceType: "Plumbing",
  whatsappTitle: "Plumber Harrow request",
  jobSummaryLabel: "Job details",
  jobLabel: "Job details (optional)",
  jobPlaceholder: "e.g. Leaking kitchen tap",
  imageFit: "contain",
  relatedIcons: ["wrench", "cert", "drop"],
};

export default function HarrowPlumberClient({ content }) {
  return <HarrowPageClient content={content} defaults={defaults} config={config} />;
}