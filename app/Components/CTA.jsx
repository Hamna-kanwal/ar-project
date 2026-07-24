"use client";
import Image from "next/image";
import { Phone, MessageCircle, ShieldCheck } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-gray-900 mb-11">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/home-cta.png"
          alt="Get a free quote"
          fill
          className="object-cover opacity-70" // Thora opacity kam kiya taake background focus na kare
          priority
        />
       </div>
      {/* Content overlay */}
      <div className="relative z-10 max-w-3xl px-8 md:px-14 py-10 md:py-10">
        <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-snug mb-5 drop-shadow-md">
          Free, No-Obligation Quotes With the{" "}
          <span className="text-[#f5a623] drop-shadow-sm">Best Possible Advice</span>
        </h2>

        <p className="text-white/80 text-base md:text-lg mb-8 max-w-xl font-medium">
          Speak to a local Gas Safe engineer today. Fixed prices. Emergency
          response in 60–90 minutes, 7 days a week.
        </p>

        {/* Buttons - Added hover lift effect */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <a
            href="tel:+447800657141"
            className="flex items-center gap-2 bg-[#f5a623] hover:bg-[#e0951a] text-white font-bold px-7 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#f5a623]/20"
          >
            <Phone size={18} />
            Call Us
          </a>

          <a
            href="https://wa.me/447800657141"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white font-semibold px-7 py-3 rounded-full transition-all duration-300"
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </a>

          <a
            href="/contact"
            className="flex items-center gap-2 border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white font-semibold px-7 py-3 rounded-full transition-all duration-300"
          >
            Get a Free Quote
          </a>
        </div>

        {/* Contact info - Improved contrast */}
        <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm font-medium">
          <a
            href="https://www.arheatingservice.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#f5a623] transition-colors"
          >
            <ShieldCheck size={16} />
            www.arheatingservice.co.uk
          </a>
          <a href="tel:+447800657141" className="flex items-center gap-2 hover:text-[#f5a623] transition-colors">
            <Phone size={16} />
            +44 7800 657141
          </a>
        </div>
      </div>
    </section>
  );
}