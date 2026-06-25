"use client";

// Galti yahan thi: 'import image' ki jagah 'import Image' hona chahiye
import Image from "next/image"; 
import React from "react";
import Script from "next/script";

export function AboutSection() {
  return (
    <section 
      id="about"
      className="py-20 bg-[#f9f9f7] overflow-hidden" 
      suppressHydrationWarning={true}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div suppressHydrationWarning={true}>
            <Script
              src="https://unpkg.com/website-carbon-badges@1.1.3/b.min.js"
              strategy="afterInteractive"
            />

            <h2 className="text-3xl sm:text-4xl font-bold text-[#005f93] mb-6 text-balance">
              Boiler Heating Services
            </h2>

            <div className="space-y-4 text-[#2d4a4a]">
              <p>
                AR Heating Services are your local and reliable expert plumbers and heating engineers in Harrow, Watford, Hemel Hempstead, St. Albans, Bushey, Stanmore, Edgware, Ruislip, Northolt, HA1, HA3, HA2, HA5, HA7, HA0, HA9, WD1, WD2, WD3, WD4, WD5, WD6, WD7, WD17, WD18, WD19, WD23, WD24, WD25, AL1, AL2, AL3, AL4, AL5.
              </p>
              <p>
                We specialise in all types of gas services including boiler & heating repair, installation, and servicing. We provide a full range of plumbing and heating services at affordable costs, no job is too big or too small with focus on customer satisfaction. Our engineers are qualified Gas Safe and are always available, all backed up by our 24hr Emergency Call out service. Our aim is to have our emergency plumber or Heating Engineer at your door within 60-90 minutes or at a time that suits you.
              </p>
            </div>
          </div>

          {/* Visual - Updated Image Component */}
          <div className="relative" suppressHydrationWarning={true}>
            <div className="aspect-square rounded-2xl overflow-hidden bg-white border-4 border-white shadow-xl relative">
              <Image 
                src="/heating.jpg" 
                alt="Heating Service"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#8dae39]/20 rounded-2xl -z-10 animate-pulse" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#8b5aa6]/10 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}