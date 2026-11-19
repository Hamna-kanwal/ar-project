import AboutUsClient from "./AboutBreakdownClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Why Choose AR Heating | Gas Safe Engineers Watford",
  description:
    "Gas Safe registered heating and plumbing engineers in Watford. Fixed prices agreed before work starts. See how we work and check our registration.",
  alternates: {
    canonical: "https://www.arheatingservice.co.uk/about",
  },
  openGraph: {
    title: "Why Choose AR Heating | Gas Safe Engineers Watford",
    description:
      "Gas Safe registered heating and plumbing engineers in Watford. Fixed prices agreed before work starts. See how we work and check our registration.",
    url: "https://www.arheatingservice.co.uk/about",
    type: "website",
    images: ["https://www.arheatingservice.co.uk/logo-footer.webp"],
  },
};

export default function AboutPage() {
  return <AboutUsClient />;
}