import React from 'react';
import Image from 'next/image';

// Example Custom Icons (Aap apne icons yahan import kar sakte hain)
const IconShield = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconClock = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Eyebrow Component helper
const Eyebrow = ({ children, light }) => (
  <span className={`text-xs md:text-sm font-bold uppercase tracking-wider mb-2 block ${light ? 'text-orange-400' : 'text-gray-500'}`}>
    {children}
  </span>
);

export default function MeetYourEngineerPage() {
  // Sample Data (Aap ise apne props ya data source se replace kar sakte hain)
  const engineer = {
    name: "Syed Azmat Hussain",
    photo: "/engineer.webp",
    gasSafeId: "Gas Safe: 574111",
    experience: "15+ Years Experience",
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center">
      {/* ============ MEET YOUR ENGINEER ============ */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#021f33] via-[#02466f] to-[#027cc1] p-8 md:p-12 shadow-2xl">
          <div className="absolute  -right-20 w-72 h-72 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-center gap-10">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-orange-500 translate-x-2 translate-y-2" />
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white bg-gray-200">
                <Image 
                  src={engineer.photo} 
                  alt="Lead AR Heating engineer" 
                  fill 
                  className="object-cover" 
                />
              </div>
            </div>
            <div className="text-center md:text-left text-white">
              <Eyebrow light>Meet your engineer</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-5">{engineer.name}</h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur px-4 py-2 rounded-full font-semibold">
                  <IconShield className="w-5 h-5 text-orange-300" /> {engineer.gasSafeId}
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur px-4 py-2 rounded-full font-semibold">
                  <IconClock className="w-5 h-5 text-orange-300" /> {engineer.experience}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}