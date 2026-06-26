"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, Mail, Phone } from "lucide-react";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

export default function Navbar({ onOpenSidebar }) {
  return (
    <>
      {/* Top Contact Bar */}
      {/* Padding px-14 se badal kar px-12 kr di */}
      <div className="relative z-50 bg-[#027cc1] text-white py-6 px-14 flex items-center justify-between text-xs border-b border-white/10">
        <div className="flex items-center gap-6">
          <a href="mailto:info@arheatingservice.co.uk" className="flex items-center gap-2 hover:text-gray-200">
            <Mail size={22} /> info@arheatingservice.co.uk
          </a>
          <a href="tel:+447800657141" className="flex items-center gap-2 hover:text-gray-200">
            <Phone size={22} /> +447800657141
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-200"><FaTwitter size={22} /></a>
          <a href="#" className="hover:text-gray-200"><FaFacebook size={22} /></a>
          <a href="#" className="hover:text-gray-200"><FaInstagram size={22} /></a>
        </div>
      </div>

      {/* Header / Logo and Menu */}
      <header className="absolute top-12 left-0 w-full z-50 bg-transparent">
        {/* Padding px-8 se badal kar px-12 kr di taake top bar se match ho */}
        <nav className="py-6 px-12 flex items-center justify-between">
          <Link href="/" className="relative w-[120px] h-[80px] block">
          <Image 
  src="/heating.jpeg" 
  alt="Logo" 
  width={500}       // Yahan width apni zaroorat ke mutabiq adjust karein
  height={300}      // Yahan height set karein
  className="object-contain rounded-4xl" 
/>
          </Link>

          <button 
            onClick={onOpenSidebar} 
            className="p-2 bg-[#027cc1] hover:bg-[#027cc1] backdrop-blur-sm rounded-[8px] transition-all border border-white/20"
          >
            <Menu className="w-8 h-8 text-white" />
          </button>
        </nav>
      </header>
    </>
  );
}