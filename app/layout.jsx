import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'leaflet/dist/leaflet.css';
import ConditionalLayout from "./Components/ConditionalLayout";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = { 
  title: "Gas Safe Heating Engineers in Watford | AR Heating ",
  description: "Boiler installation, repair and servicing in Watford and Harrow. Gas Safe No. 574111. Free fixed price quotes. Emergency callouts 24 hours. ",
  alternates: {
    canonical: "https://www.arheatingservice.co.uk/",
  },
  verification: {
    google: "69Wr8UzTD9qZr3Uq0jA1I88oqtPasMHAWp3zTBOgHlA",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#0f1113]">
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}