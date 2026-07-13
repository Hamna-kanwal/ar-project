import Image from 'next/image';
import Link from 'next/link';
import { MdEmail, MdSmartphone, MdLocationOn } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="relative bg-[#027cc1] text-white pt-16 pb-8 px-6 lg:px-20">
      
      {/* Grid container: Ab 5 columns hain */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Column 1: Logo aur Intro */}
        <div className="flex flex-col items-start md:col-span-1">
          <Image 
            src="/footer.png" 
            alt="AR Heating Logo" 
            width={300} 
            height={150} 
            className="w-auto h-24 mb-6"
          />
          <p className="text-sm leading-relaxed text-left opacity-90">
            Empowering UK businesses with transparent energy solutions. We simplify procurement, reduce costs, and drive sustainability.
          </p>
        </div>

        {/* Columns 2, 3, 4: Services, Quick Links, Support */}
        {[
          { title: "Our Services", links: ["Boiler Installation", "Heating Installation", "Landlord Certificate", "Dishwasher Installation", "Power Flushing"] },
          { title: "Quick Links", links: ["Why AR-Heating", "About Us", "Area We Cover", "Blogs"] },
          { title: "Support", links: ["FAQ", "Privacy Policy", "Terms & Conditions", "Contact Us"] }
        ].map((col, index) => (
          <div key={index} className="text-left flex flex-col items-start">
            <h3 className="font-bold border-l-4 border-yellow-500 pl-3 mb-6 uppercase text-sm tracking-wider">
              {col.title}
            </h3>
            <ul className="space-y-3 text-sm">
              {col.links.map((link) => (
                <li key={link} className="hover:text-yellow-400 transition-colors cursor-pointer">
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Column 5: Contact Us (Naya alag column) */}
        <div className="text-left flex flex-col items-start">
          <h3 className="font-bold border-l-4 border-yellow-500 pl-3 mb-6 uppercase text-sm tracking-wider">
            Contact Us
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <MdEmail className="text-xl text-yellow-500 mt-1" />
              <span>info@arheatingservice.co.uk</span>
            </div>
            <div className="flex items-start gap-3">
              <MdSmartphone className="text-xl text-yellow-500 mt-1" />
              <span>+44 7800 657141</span>
            </div>
            <div className="flex items-start gap-3">
              <MdLocationOn className="text-xl text-yellow-500 mt-1" />
              <span>Unit 24 The Roundway, Watford, WD18 6LB</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-xs opacity-70 gap-4">
        <p>© 2026 AR HEATING. ALL RIGHTS RESERVED. | POWERED BY TEQNOOR</p>
        <p className="cursor-pointer hover:text-white">MODERN SLAVERY STATEMENT</p>
      </div>
    </footer>
  );
}