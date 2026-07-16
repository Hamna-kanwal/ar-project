import Image from 'next/image';
import Link from 'next/link';
import { MdEmail, MdSmartphone, MdLocationOn } from "react-icons/md";

export default function Footer() {
  const footerSections = [
    {
      title: "Our Services",
      links: [
        { name: "Boiler Installation", path: "/Services/boiler-installation" },
        { name: "Heating Installation", path: "/Services/heating-installation" },
        { name: "Landlord Certificate", path: "/Services/landlord-certificate" },
        { name: "Dishwasher Installation", path: "/Services/appliance-installation" },
        { name: "Power Flushing", path: "/Services/power-flushing" }
      ]
    },
    {
      title: "Quick Links",
      links: [
        { name: "Why AR-Heating", path: "/about" },
        { name: "About Us", path: "/about-us" },
        { name: "Area We Cover", path: "/location" },
        { name: "Blogs", path: "/blogs" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms & Conditions", path: "/terms" },
        { name: "Contact Us", path: "/contact" }
      ]
    }
  ];

  return (
    <footer className="relative bg-[#027cc1] text-white pt-16 pb-8 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        
        <div className="flex flex-col items-start md:col-span-1 -mt-4">
          <Image 
            src="/footer.png" 
            alt="AR Heating Logo" 
            width={400} 
            height={200} 
            className="w-auto h-28"
          />
          <p className="text-sm leading-relaxed text-left opacity-90">
            Empowering UK businesses with transparent energy solutions. We simplify procurement, reduce costs, and drive sustainability.
          </p>
        </div>

        {footerSections.map((col, index) => (
          <div key={index} className="text-left flex flex-col items-start">
            <h3 className="font-bold border-l-4 border-yellow-500 pl-3 mb-6 uppercase text-sm tracking-wider">
              {col.title}
            </h3>
            <ul className="space-y-3 text-sm">
              {col.links.map((link) => (
                <li key={link.name} className="hover:text-yellow-400 transition-colors">
                  <Link href={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

      <div className="text-left flex flex-col items-start">
  <h3 className="font-bold border-l-4 text-yellow-400 pl-3 mb-6 uppercase text-sm tracking-wider">
    Contact Us
  </h3>
  
  <div className="space-y-4 text-sm">
    {/* Email */}
    <div className="flex items-center gap-3">
      <MdEmail className="text-[28px] text-yellow-400" />
      <span>info@arheatingservice.co.uk</span>
    </div>
    
    {/* Phone */}
    <div className="flex items-center gap-3">
      <MdSmartphone className="text-[28px] text-yellow-400" />
      <span>+44 7800 657141</span>
    </div>
    
    {/* Address - Agar text lamba ho toh items-start behtar hota hai */}
    <div className="flex items-start gap-3">
      <MdLocationOn className="text-[28px] text-yellow-400 shrink-0" />
      <span>Unit 24 The Roundway, Watford, WD18 6LB</span>
    </div>
  </div>
</div>
      </div>
<div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-xs opacity-70 gap-4">
  {/* <p> ko <div> ya <span> se replace karein */}
  <div className="text-center">
    © 2026 AR HEATING. ALL RIGHTS RESERVED. | POWERED BY{' '}
    <a href="https://teqnoor.com" className="text-white hover:underline text">
      TEQNOOR
    </a>
  </div>
</div>
    </footer>
  );
}