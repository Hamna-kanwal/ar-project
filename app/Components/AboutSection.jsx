"use client";

import Image from "next/image";
import React from "react";
import Script from "next/script";
import defaults from "../_defaults/home.json";

export default function AboutSection({ content }) {
  const c = { ...defaults.about, ...(content || {}) };
  const paragraphs = Array.isArray(c.paragraphs) && c.paragraphs.length > 0 ? c.paragraphs : defaults.about.paragraphs;

  return (
    <section
      id="about"
      className="py-12 md:py-16 bg-[#f9f9f7] overflow-hidden"
      suppressHydrationWarning={true}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Content Section */}
          <div suppressHydrationWarning={true}>
            <Script
              src="https://unpkg.com/website-carbon-badges@1.1.3/b.min.js"
              strategy="afterInteractive"
            />

            <h2 className="text-3xl sm:text-4xl font-bold text-[#005f93] mb-6 text-balance">
              {c.heading}
            </h2>

            <div className="space-y-4 text-[#2d4a4a]">
              <p className="font-semibold text-lg">{c.subheading}</p>
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Images Section (stays in code) */}
          <div className="relative w-full h-full flex flex-col justify-center min-h-[420px] md:min-h-[480px]">
            <div className="relative w-full flex flex-col justify-center">

              <div className="relative w-full overflow-hidden rounded-xl shadow-2xl z-10">
                <Image
                  src="/horizontal.webp"
                  alt="Boiler Heating Services in Watford"
                  width={600}
                  height={400}
                  className="w-full h-[220px] sm:h-[280px] md:h-[600px] object-cover"
                />
              </div>

              <div className="hidden md:block absolute right-4 -bottom-10 w-72 h-52 overflow-hidden rounded-xl shadow-2xl z-20 border-4 border-white bg-white">
                <Image
                  src="/vertical.webp"
                  alt="Heating Engineer at Work"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}