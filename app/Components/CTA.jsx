import Link from 'next/link';
import { MdCheckCircle } from 'react-icons/md';

export default function CTA() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden flex items-center mb-16">
      {/* Background Image side with Diagonal Cut */}
      <div 
        className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(/home-cta.png)', // Apni image file ka naam check kar lein
          clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)' 
        }}
      />

      {/* Content Side */}
      <div className="relative z-10 w-full md:w-2/3 px-6 md:px-16 text-white flex flex-col justify-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          Need a Reliable <span className="text-orange-500">Plumber</span> Today?
        </h2>
        <p className="text-lg md:text-xl mb-8 opacity-90 max-w-lg">
          Fast, professional plumbing services for homes and businesses. 
          Get expert solutions with transparent pricing and same-day service.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link href="/contact" className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition shadow-lg">
            GET FREE QUOTE
          </Link>
          <Link href="tel:+447800657141" className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-[#0d2341] text-white font-bold rounded-full transition">
            CALL NOW
          </Link>
        </div>

        {/* Checkmarks Row */}
        <div className="flex flex-wrap gap-4 text-xs md:text-sm font-medium">
          {['Licensed & Certified', 'Insured for Your Peace of Mind', '24/7 Emergency Service', 'Free Estimates'].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <MdCheckCircle className="text-white text-lg" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}