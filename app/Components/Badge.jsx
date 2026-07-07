import { ShieldCheck, Clock } from "lucide-react";
import Image from "next/image";
import Link  from "next/link"

export default function TrustSection() {
  return (
    <section className="bg-[#0f4d6d] py-16 px-6 text-white border-t-8 border-[#f97316]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Certificate Card */}
        <div className="bg-white text-gray-900 rounded-3xl p-8 shadow-2xl relative border-b-8 border-[#f97316]">
          {/* Badge Image */}
          <div className="absolute -top-10 -right-4 w-28 h-28 z-10">
          <Link href="https://www.gassaferegister.co.uk/find-an-engineer/check-a-business/?id=z6Bj0%2b9BiC3wfVafaxt2%2bA%3d%3d&st=registration" target="_blank" rel="noopener noreferrer">
              <Image 
                src="/gas-register.png" 
                alt="Gas Safe" 
                width={80} 
                height={80} 
                className="cursor-pointer bg-white p-1 rounded"
              />
            </Link>
          </div>

          <div className="flex flex-col items-center text-center">
            <Image src="/gas-safe-logo.png" alt="Gas Safe" width={120} height={120} className="mb-4" />
            <h3 className="text-2xl font-bold mb-2">Gas Safe Registered</h3>
            <p className="text-gray-600 italic mb-6">"Official Registration No. 574111"</p>
            <a href="#" className="text-[#f97316] font-bold hover:underline flex items-center gap-1">
              Verify Registration ↗
            </a>
          </div>
        </div>

        {/* Right Side: Trust Text */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Trusted by Households, <br />
            <span className="text-[#f97316]">Backed by Expertise.</span>
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            We bring over 15 years of industry experience to help Watford & Harrow 
            residents navigate heating and plumbing issues with complete confidence.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-5 rounded-2xl border-2 border-[#f97316]/30 hover:border-[#f97316] transition-all">
              <Clock className="w-8 h-8 mb-3 text-[#f97316]" />
              <h4 className="font-bold text-lg">24/7 Support</h4>
              <p className="text-sm text-gray-300">Always here when you need us</p>
            </div>
            <div className="bg-white/10 p-5 rounded-2xl border-2 border-[#f97316]/30 hover:border-[#f97316] transition-all">
              <ShieldCheck className="w-8 h-8 mb-3 text-[#f97316]" />
              <h4 className="font-bold text-lg">Fully Insured</h4>
              <p className="text-sm text-gray-300">Your home is in safe hands</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}