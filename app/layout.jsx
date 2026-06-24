import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = { 
  title: "Business Energy Solutions UK | Save on Gas & Electricity | Eazy Switch",
  description: "Cut your business energy costs with Eazy Switch. Compare UK suppliers, secure better rates, and get tailored contracts with transparent pricing and no hidden fees.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#0f1113]" suppressHydrationWarning={true}>
        {children}
       <Toaster 
          position="top-right" 
          reverseOrder={false}
          containerStyle={{
            top: 40,
          }}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#6366f1", 
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}