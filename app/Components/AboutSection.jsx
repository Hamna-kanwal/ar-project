"use client";

// Galti yahan thi: 'import image' ki jagah 'import Image' hona chahiye
import Image from "next/image"; 
import React from "react";
import Script from "next/script";

export  default function AboutSection() {
  return (
    <section 
      id="about"
      className="py-11 bg-[#f9f9f7] overflow-hidden" 
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
                Gas Safe Heating Engineers in Watford, Harrow & Hemel Hempstead

              </p>
              <p>
               AR Heating Services is a Gas Safe registered (No. 574111) heating and plumbing company based at Unit 24, The Roundway, Watford, WD18 6LB. Since 2012, our local engineers have installed, repaired and serviced boilers for homeowners and landlords across Watford, Harrow, Hemel Hempstead, St. Albans, Bushey, Stanmore, Edgware, Ruislip and Northolt.

              </p>
                <p>
             We specialise in boiler installation, boiler repair, annual servicing, power flushing, Megaflo cylinders, smart thermostats and landlord gas safety certificates (CP12)  all at fixed, affordable prices agreed before work starts. No job is too big or too small. Need help urgently? Our 24-hour emergency call-out service aims to have an engineer at your door within 60–90 minutes, or at a time that suits you.


              </p>
            </div>
          </div>

          {/* Visual - Updated Image Component */}
          <div className="relative" suppressHydrationWarning={true}>
           <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-white border-4 border-white shadow-xl">
  <Image 
    src="/heating.jpg" 
    alt="Heating Service"
    fill
    className="object-cover" // Image ko box mein fit karega
    sizes="(max-width: 768px) 100vw, 400px" // Next.js performance ke liye zaroori hai
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