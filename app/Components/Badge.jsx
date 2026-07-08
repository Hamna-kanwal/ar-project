import { ShieldCheck, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TrustSection() {
  return (
    <section className="bg-[#027cc1] py-16 px-6 text-white relative overflow-hidden">
      {/* BACKGROUND DECORATIVE ELEMENTS (Blobs & Circles) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Organic Circle (Jaisa aapne red mark kiya tha) */}
        <div className="absolute -top-20 -left-20 w-40 h-40 border-[16px] border-emerald-500/20 rounded-full" />
        {/* Soft Blob */}
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#f97316] rounded-full mix-blend-multiply filter blur-[128px] opacity-20" />
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* Left Side: Certificate Card */}
        {/* Left Side: Certificate Card */}
<div className="bg-white text-gray-900 rounded-3xl p-4 shadow-2xl relative border-b-8 border-[#f97316]">
  
  <div className="flex flex-col items-center text-center space-y-4">
    
    <Image 
      src="/gas-register.png" 
      alt="Gas Safe" 
      width={90} 
      height={90} 
      className="cursor-pointer bg-white p-1 shadow-lg"
    />
    
    <div className="space-y-1">
      <h3 className="text-2xl font-bold">Gas Safe Registered</h3>
      <p className="text-gray-600 italic">"Official Registration No. 574111"</p>
    </div>
    
    <Link 
      href="https://www.gassaferegister.co.uk/find-an-engineer/check-a-business/?id=z6Bj0%2b9BiC3wfVafaxt2%2bA%3d%3d&st=registration" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-[#f97316] font-bold hover:underline flex items-center gap-1 pt-2"
    >
      Verify Registration ↗
    </Link>
    
  </div>
</div>

        {/* Right Side: Trust Text */}
        <div>
          <h2 className="text-2xl md:text-2xl font-bold mb-6 leading-tight">
            Trusted by Households, 
Backed by Expertise.
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            We bring over 15 years of industry experience to help Watford & Harrow 
            residents navigate heating and plumbing issues with complete confidence.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-5 rounded-2xl border border-white/10 hover:border-white transition-all">
              <Clock className="w-8 h-8 mb-3 text-white" />
              <h4 className="font-bold text-lg">24/7 Support</h4>
              <p className="text-sm text-gray-300">Always here when you need us</p>
            </div>
            <div className="bg-white/10 p-5 rounded-2xl border border-white/10 hover:border-white transition-all">
              <ShieldCheck className="w-8 h-8 mb-3 text-white" />
              <h4 className="font-bold text-lg">Fully Insured</h4>
              <p className="text-sm text-gray-300">Your home is in safe hands</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}