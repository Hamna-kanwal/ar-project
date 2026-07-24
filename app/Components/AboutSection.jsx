"use client";

import Image from "next/image"; 
import React from "react";
import Script from "next/script";

export default function AboutSection() {
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
              Boiler Heating Services
            </h2>

            <div className="space-y-4 text-[#2d4a4a]">
              <p className="font-semibold text-lg">
                Gas Safe Heating Engineers in Watford, Harrow & Hemel Hempstead
              </p>
              <p>
                AR Heating Services is a Gas Safe registered (No. 574111) heating and plumbing company based at Unit 24, The Roundway, Watford, WD18 6LB. Since 2012, our local engineers have installed, repaired and serviced boilers for homeowners and landlords across Watford, Harrow, Hemel Hempstead, St. Albans, Bushey, Stanmore, Edgware, Ruislip and Northolt.
              </p>
              <p>
                We specialise in boiler installation, boiler repair, annual servicing, power flushing, Megaflo cylinders, smart thermostats and landlord gas safety certificates (CP12) all at fixed, affordable prices agreed before work starts. No job is too big or too small. Need help urgently? Our 24-hour emergency call-out service aims to have an engineer at your door within 60–90 minutes, or at a time that suits you.
              </p>
            </div>
          </div>

          {/* Images Section - Matches Content Height Layout */}
          <div className="relative w-full h-full flex flex-col justify-center min-h-[420px] md:min-h-[480px]">
            <div className="relative w-full flex flex-col justify-center">
              
              {/* Horizontal Image */}
              <div className="relative w-full overflow-hidden rounded-xl shadow-2xl z-10">
                <Image 
                  src="/horizontal.jpg" 
                  alt="Boiler Heating Services in Watford" 
                  width={600} 
                  height={400}
                  className="w-full h-[220px] sm:h-[280px] md:h-[600px] object-cover" 
                />
              </div>

              {/* Vertical Image (Overlapping on Desktop) */}
              <div className="hidden md:block absolute right-4 -bottom-10 w-72 h-52 overflow-hidden rounded-xl shadow-2xl z-20 border-4 border-white bg-white">
                <Image 
                  src="/vertical.jpg" 
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