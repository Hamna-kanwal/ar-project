import Image from 'next/image';
import Link from 'next/link';
import { MdEmail, MdSmartphone, MdLocationOn } from "react-icons/md";

export default function Footer() {
  return (
  <footer className="relative bg-[#027cc1] text-white pt-12 pb-20 px-6 lg:px-20">
      
      {/* Grid container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Logo aur Intro */}
        <div className="flex flex-col items-start">
          <Image 
            src="/footer.png" 
            alt="AR Heating Logo" 
            width={400} 
            height={400} 
            className="w-auto h-32 mb-4"
          />
          <p className="text-sm leading-relaxed text-left">
            Empowering UK businesses with transparent energy solutions. We simplify procurement, reduce costs, and drive sustainability.
          </p>
        </div>

        {/* Columns 2, 3, 4 */}
        {[
          { title: "Our Services", links: ["Boiler Installation", "Heating Installation", "Landlord Certificate", "Dishwasher Installation", "Power Flushing"] },
          { title: "Quick Links", links: ["Why AR-Heating", "About Us", "Area We Cover", "Blogs"] },
          { title: "Support", links: ["FAQ", "Privacy Policy", "Terms & Conditions", "Contact Us"] }
        ].map((col, index) => (
          <div key={index} className="text-left flex flex-col items-start ">
            <h3 className="font-bold  border-l-4 border-yellow-500 pl-2">
              {col.title}
            </h3>
            <ul className="space-y-3 text-sm cursor-pointer">
              {col.links.map((link) => (
                <li key={link} className="hover:text-yellow-500 transition-colors">
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}

      {/* Contact Box: positioned over center area on md+ screens */}
        <div className="w-full md:absolute md:left-[55%] md:-translate-x-1/2 md:top-40 lg:top-44 md:w-10/12 border-2 border-white rounded-xl py-6 px-6">
  <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
    <div className="flex items-center gap-3">
      <MdEmail className="text-2xl text-white" /> 
      <span>info@arheatingservice.co.uk</span>
    </div>
    <div className="flex items-center gap-3">
      <MdSmartphone className="text-2xl text-white" /> 
      <span>+447800657141</span>
    </div>
    <div className="flex items-center gap-3">
      <MdLocationOn className="text-2xl text-white" /> 
      <span>Unit 24 The Roundway Watford, WD18 6LB</span>
    </div>
  </div>
</div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-xs text-gray-300 gap-4">
        <p>© 2026 AR HEATING. ALL RIGHTS RESERVED. | POWERED BY TEQNOOR</p>
        <p className="cursor-pointer hover:text-white">MODERN SLAVERY STATEMENT</p>
      </div>
    </footer>
  );
}