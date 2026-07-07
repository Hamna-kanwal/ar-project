import Image from 'next/image';
import Link from 'next/link';
import { MdEmail, MdPhone, MdLocationOn, MdSmartphone } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-[#027cc1] text-white py-12 px-6 lg:px-20">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 items-start">
        
        {/* Column 1: Logo aur info (Left Aligned) */}
        <div className="flex flex-col items-start">
          <Image 
            src="/footer.png" 
            alt="AR Heating Logo" 
            width={400} 
            height={400} 
            className="w-auto h-24 mb-4"
          />
          <p className="text-sm leading-relaxed text-left mb-6">
            Empowering UK businesses with transparent energy solutions. We simplify procurement, reduce costs, and drive sustainability.
          </p>
          <div className="space-y-3 text-sm text-left">
            <p className="flex items-center gap-2"><MdEmail className="text-lg" /> info@arheatingservice.co.uk</p>
            <p className="flex items-center gap-2"><MdSmartphone className="text-lg" /> +447800657141</p>
            <p className="flex items-start gap-2"><MdLocationOn className="text-xl mt-0.5" /> Unit 24 The Roundway Watford, WD18 6LB</p>
          </div>
        </div>

        {/* Columns 2, 3, 4 (Right Aligned) */}
        {[
          { title: "Our Services", links: ["Boiler Installation", "Heating Installation", "Landlord Certificate", "Dishwasher Installation", "Power Flushing"] },
          { title: "Quick Links", links: ["Why AR-Heating", "About Us", "Area We Cover", "Blogs"] },
          { title: "Support", links: ["FAQ", "Privacy Policy", "Terms & Conditions", "Contact Us"] }
        ].map((col, index) => (
          <div key={index} className="text-right flex flex-col items-end">
            {/* Heading aur border-right ka use kiya taake right alignment mein achha lage */}
            <h3 className="font-bold mb-4 border-r-4 border-yellow-500 pl-2">
              {col.title}
            </h3>
            <ul className="space-y-3 text-sm cursor-pointer">
              {col.links.map((link) => (
                <li key={link} className="hover:text-yellow-500 transition-colors">{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-xs text-gray-300 gap-4">
        <p>© 2026 AR HEATING. ALL RIGHTS RESERVED. | POWERED BY TEQNOOR</p>
        <p className="cursor-pointer hover:text-white">MODERN SLAVERY STATEMENT</p>
      </div>
    </footer>
  );
}