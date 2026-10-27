export const metadata = {
  title: "About AR Heating | Heating and Plumbing in Watford",
  description: "AR Heating is a Gas Safe registered heating and plumbing firm at Unit 24, The Roundway, Watford. We cover Watford, Harrow and nearby towns.",
  openGraph: {
    title: "About AR Heating | Heating and Plumbing in Watford",
    description: "AR Heating is a Gas Safe registered heating and plumbing firm at Unit 24, The Roundway, Watford. We cover Watford, Harrow and nearby towns.",
    url: "https://www.arheatingservice.co.uk/about-us",
    images: ["https://www.arheatingservice.co.uk/logo-footer.webp"],
    type: "website",
  },
    alternates: {
    canonical: "https://www.arheatingservice.co.uk/about-us",
  },
};

export default function BoilerLayout({ children }) {
  return <>{children}</>;
}