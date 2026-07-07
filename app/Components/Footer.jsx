import Image from 'next/image';
import Link from 'next/link';
import { MdEmail, MdPhone, MdLocationOn, MdSmartphone } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-[#027cc1] text-white py-12 px-4 sm:px-6 lg:px-32 xl:px-20">
      
      {/* Grid container */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
        
        {/* Column 1 */}
        <div className="flex flex-col items-start">
          <Image 
            src="/footer.png" 
            alt="AR Heating Logo" 
            width={400} 
            height={400} 
            className="w-auto h-32 mb-4"
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

        {/* Column 2 */}
        <div className="text-left">
          <h3 className="font-bold mb-4 border-l-4 border-yellow-500 pl-2">Our Services</h3>
          <ul className="space-y-3 text-sm cursor-pointer">
            <li className="hover:text-yellow-500 transition-colors">Boiler Installation</li>
            <li className="hover:text-yellow-500 transition-colors">Heating Installation</li>
            <li className="hover:text-yellow-500 transition-colors">Landlord Certificate</li>
            <li className="hover:text-yellow-500 transition-colors">Dishwasher Installation</li>
            <li className="hover:text-yellow-500 transition-colors">Power Flushing</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="text-left">
          <h3 className="font-bold mb-4 border-l-4 border-yellow-500 pl-2">Quick Links</h3>
          <ul className="space-y-3 text-sm cursor-pointer">
            <li className="hover:text-yellow-500 transition-colors">Why AR-Heating</li>
            <li className="hover:text-yellow-500 transition-colors">About Us</li>
            <li className="hover:text-yellow-500 transition-colors">Area We Cover</li>
            <li className="hover:text-yellow-500 transition-colors">Blogs</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="text-left">
          <h3 className="font-bold mb-4 border-l-4 border-yellow-500 pl-2">Support</h3>
          <ul className="space-y-3 text-sm cursor-pointer">
            <li className="hover:text-yellow-500 transition-colors">FAQ</li>
            <li className="hover:text-yellow-500 transition-colors">Privacy Policy</li>
            <li className="hover:text-yellow-500 transition-colors">Terms & Conditions</li>
            <li className="hover:text-yellow-500 transition-colors">Contact Us</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-gray-300 gap-4 w-full">
        <p>© 2026 AR HEATING. ALL RIGHTS RESERVED. | POWERED BY TEQNOOR</p>
        <p className="cursor-pointer hover:text-white">MODERN SLAVERY STATEMENT</p>
      </div>
    </footer>
  );
}