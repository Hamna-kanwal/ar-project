const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.arheatingservice.co.uk/";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Heating and Boiler Advice | AR Heating Blog ",
  description:
    "Plain advice on boilers, radiators, power flushing and heating costs from the Gas Safe engineers at AR Heating in Watford. ",
  alternates: {
    canonical: "https://www.arheatingservice.co.uk/blogs",
  },
};

export default function BlogsLayout({ children }) {
  return children;
}