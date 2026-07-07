import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#007cc1] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Logo & Info */}
        <div className="space-y-6">
          <Image src="/logo.png" alt="AR Heating" width={140} height={50} />
          <p className="text-sm text-blue-100 leading-relaxed max-w-xs">
            Expert heating and plumbing solutions for homes and businesses. 
            Reliable, Gas Safe certified, and always at your service.
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3"><Mail size={18} className="text-orange-400" /> info@arheatingservice.co.uk</div>
            <div className="flex items-center gap-3"><Phone size={18} className="text-orange-400" /> +447800657141</div>
            <div className="flex items-start gap-3"><MapPin size={18} className="text-orange-400" /> Unit 24 The Roundway, Watford, WD18 6LB</div>
          </div>
        </div>

        {/* Links Sections - Simplified */}
        {[
          { title: "Services", links: ["Boiler Installation", "Heating Installation", "Landlord Certificate", "Dishwasher Install", "Power Flushing"] },
          { title: "Quick Links", links: ["Why AR-Heating", "About Us", "Area We Cover", "Blogs"] },
          { title: "Support", links: ["FAQ", "Privacy Policy", "Terms & Conditions", "Contact Us"] }
        ].map((section) => (
          <div key={section.title}>
            <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-wider underline underline-offset-8 decoration-orange-400">
              {section.title}
            </h4>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link}>
                  <Link href="#" className="flex items-center text-blue-50 hover:text-white transition-all group">
                    <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-blue-200">
        <p>© 2026 AR HEATING. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6 mt-4 md:mt-0 uppercase tracking-widest">
          <Link href="#" className="hover:text-white">Privacy</Link>
          <Link href="#" className="hover:text-white">Slavery Statement</Link>
          <p>POWERED BY TEQNOOR</p>
        </div>
      </div>
    </footer>
  );
}