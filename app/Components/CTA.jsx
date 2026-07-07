// components/CtaBanner.jsx
"use client";
import Image from "next/image";
import { Phone, MessageCircle, ShieldCheck } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden p-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/home-cta.png"
          alt="Get a free quote"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 max-w-3xl px-8 md:px-14 py-14 md:py-20">
        <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-snug mb-5">
          Free, No-Obligation Quotes With the{" "}
          <span className="text-[#f5a623]">Best Possible Advice</span>
        </h2>

        <p className="text-white/90 text-base md:text-lg mb-8 max-w-xl">
          Speak to a local Gas Safe engineer today. Fixed prices. Emergency
          response in 60–90 minutes, 7 days a week.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <a
            href="tel:+447800657141"
            className="flex items-center gap-2 bg-[#f5a623] hover:bg-[#e0951a] text-white font-semibold px-6 py-3 rounded-full transition"
          >
            <Phone size={18} />
            Call Us
          </a>

          <a
            href="https://wa.me/447800657141"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/70 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </a>

          <a
            href="#quote"
            className="flex items-center gap-2 border border-white/70 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Get a Free Quote
          </a>
        </div>

        {/* Contact info */}
        <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm">
          <a
            href="https://www.arheatingservice.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-90"
          >
            <ShieldCheck size={16} />
            www.arheatingservice.co.uk
          </a>
          <a href="tel:+447800657141" className="flex items-center gap-2 hover:opacity-90">
            <Phone size={16} />
            +44 7800 657141
          </a>
        </div>
      </div>
    </section>
  );
}