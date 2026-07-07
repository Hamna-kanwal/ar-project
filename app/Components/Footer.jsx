import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#007cc1] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <Image src="/heating-logo.png" alt="AR Heating" width={120} height={40} />
          <p className="text-sm text-blue-50 leading-relaxed opacity-90">
            Empowering UK homes with reliable, Gas Safe certified heating and plumbing solutions.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><Mail size={16} /> info@arheatingservice.co.uk</div>
            <div className="flex items-center gap-2"><Phone size={16} /> +447800657141</div>
            <div className="flex items-start gap-2"><MapPin size={16} /> Unit 24 The Roundway, Watford, WD18 6LB</div>
          </div>
        </div>

        {/* Links Columns - Compact Style */}
        {[
          { title: "Services", links: ["Boiler Installation", "Heating Installation", "Landlord Certificate", "Dishwasher", "Power Flushing"] },
          { title: "Quick Links", links: ["Why AR-Heating", "About Us", "Area We Cover", "Blogs"] },
          { title: "Support", links: ["FAQ", "Privacy Policy", "Terms & Conditions", "Contact Us"] }
        ].map((section) => (
          <div key={section.title}>
            <h4 className="font-bold text-lg mb-4 border-l-4 border-orange-400 pl-3 uppercase tracking-wider text-sm">
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-blue-50 hover:text-orange-300 transition-colors text-sm font-medium">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs opacity-70">
        <p>© 2026 AR HEATING. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="#">Modern Slavery Statement</Link>
          <p>POWERED BY TEQNOOR</p>
        </div>
      </div>
    </footer>
  );
}