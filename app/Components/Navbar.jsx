"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, Mail, Phone } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Navbar({ onOpenSidebar }) {
  return (
    <>
      {/* Top Contact Bar */}
      {/* Padding px-14 se badal kar px-12 kr di */}
     <div className="bg-[#027cc1] text-white py-4 px-4 md:px-14 flex flex-wrap items-center justify-center md:justify-between gap-y-3 text-[11px] md:text-xs border-b border-white/10">
  
  {/* Left Section - Contact Info */}
  <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
    <a href="mailto:info@arheatingservice.co.uk" className="flex items-center gap-2 hover:text-gray-200">
      <Mail size={16} /> info@arheatingservice.co.uk
    </a>
    <a href="tel:+447800657141" className="flex items-center gap-2 hover:text-gray-200">
      <Phone size={16} /> +447800657141
    </a>
  </div>

  {/* Right Section - Social Media */}
  <div className="flex items-center gap-4">
    <a href="#" className="hover:text-gray-200"><FaFacebook size={18} /></a>
    <a href="#" className="hover:text-gray-200"><FaInstagram size={18} /></a>
  </div>
</div>

    
<header className="absolute top-4 left-0 w-full z-50 bg-transparent">
  {/* py-6 aur mt-2 hata diya gaya hai */}
  <nav className="px-10 flex items-center justify-between">
    <Link href="/" className="relative w-[120px] h-[40px] block">
      <Image 
        src="/ar-logo.png" 
        alt="Logo" 
        width={200} 
        height={100} 
        className="object-contain rounded-4xl" 
      />
    </Link>

    {/* mt-12 hata diya taake button center mein rahe */}
    <button 
      onClick={onOpenSidebar} 
      className="p-2 bg-[#027cc1] hover:bg-blue-700 backdrop-blur-sm rounded-[8px] transition-all border border-white/20"
    >
      <Menu className="w-8 h-8 text-white" />
    </button>
  </nav>
</header>    </>
  );
}