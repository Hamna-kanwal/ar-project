import Image from 'next/image';
import Link from 'next/link';
import { MdEmail, MdSmartphone, MdLocationOn } from "react-icons/md";

export default function Footer() {
  const footerSections = [
    {
      title: "Our Services",
      links: [
        { name: "Boiler Installation", path: "/services/boiler-installation" },
        { name: "Heating Installation", path: "/services/heating-installation" },
        { name: "Landlord Certificate", path: "/services/landlord-certificate" },
        { name: "Dishwasher Installation", path: "/services/appliance-installation" },
        { name: "Power Flushing", path: "/services/power-flushing" }
      ]
    },
    {
      title: "Quick Links",
      links: [
        { name: "Why AR-Heating", path: "/why-us" },
        { name: "About Us", path: "/about" },
        { name: "Area We Cover", path: "/areas" },
        { name: "Blogs", path: "/blog" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "FAQ", path: "/faq" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms & Conditions", path: "/terms" },
        { name: "Contact Us", path: "/contact" }
      ]
    }
  ];

  return (
    <footer className="relative bg-[#027cc1] text-white pt-16 pb-8 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        
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
          <h3 className="font-bold border-l-4 border-yellow-500 pl-3 mb-6 uppercase text-sm tracking-wider">
            Contact Us
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <MdEmail className="text-[32px] text-yellow-500 mt-0" />
              <span className="mt-1">info@arheatingservice.co.uk</span>
            </div>
            <div className="flex items-start gap-3">
              <MdSmartphone className="text-[32px] text-yellow-500 mt-0" />
              <span className="mt-1">+44 7800 657141</span>
            </div>
            <div className="flex items-start gap-3">
              <MdLocationOn className="text-[32px] text-yellow-500 mt-0" />
              <span className="mt-1">Unit 24 The Roundway, Watford, WD18 6LB</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-xs opacity-70 gap-4">
        <p>© 2026 AR HEATING. ALL RIGHTS RESERVED. | POWERED BY TEQNOOR</p>
        <Link href="/modern-slavery-statement" className="cursor-pointer hover:text-white underline">
          MODERN SLAVERY STATEMENT
        </Link>
      </div>
    </footer>
  );
}