"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, Mail, Phone } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Navbar({ onOpenSidebar }) {
  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-[#027cc1] text-white py-2 px-4 md:px-14 flex flex-wrap items-center justify-center md:justify-between gap-y-2 text-[10px] md:text-xs">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <a href="mailto:info@arheatingservice.co.uk" className="flex items-center gap-2 hover:text-gray-200">
            <Mail size={14} /> info@arheatingservice.co.uk
          </a>
          <a href="tel:+447800657141" className="flex items-center gap-2 hover:text-gray-200">
            <Phone size={14} /> +447800657141
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href="#"><FaFacebook size={16} /></a>
          <a href="#"><FaInstagram size={16} /></a>
        </div>
      </div>

      {/* Main Navbar */}
     {/* Main Navbar */}
<header className="sticky top-0 w-full z-50 bg-transparent"> 
  <nav className="max-w-7xl mx-auto py-4 px-4 md:px-12 flex items-center justify-between">
    <Link href="/">
      <Image src="/ar-logo.png" alt="Logo" width={100} height={40} className="object-contain" />
    </Link>
    <button 
      onClick={onOpenSidebar} 
      className="p-2 bg-[#027cc1] rounded-lg text-white hover:bg-[#0266a1] transition-all"
    >
      <Menu className="w-6 h-6" />
    </button>
  </nav>
</header>
    </>
  );
}