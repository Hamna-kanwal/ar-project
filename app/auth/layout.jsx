import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import 'leaflet/dist/leaflet.css';


const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });



export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#0f1113]">

          {children}
    
      </body>
    </html>
  );
}