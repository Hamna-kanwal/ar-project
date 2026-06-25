import Link from "next/link";
import NextImage from "next/image";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#005f93] text-white py-24 px-32">
      {/* justify-between se sections ke darmiyan natural aur barabar space aayegi */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-2 items-start">
        
        {/* Left: Logo & Socials */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <NextImage 
            src="/AR-02.png" 
            alt="Logo" 
            width={150} 
            height={80} 
            className="object-contain" 
          />
          <div className="flex gap-4">
            <a href="#" className="p-3 bg-orange-500 rounded-full hover:bg-orange-600 transition"><FaTwitter size={20} /></a>
            <a href="#" className="p-3 bg-orange-500 rounded-full hover:bg-orange-600 transition"><FaFacebook size={20} /></a>
            <a href="#" className="p-3 bg-orange-500 rounded-full hover:bg-orange-600 transition"><FaInstagram size={20} /></a>
          </div>
        </div>

        {/* Middle: Links */}
        <div className="w-full md:w-auto">
          <h3 className="text-xl font-bold mb-6 text-white">QUICK LINKS</h3>
          <ul className="space-y-4">
            <li><Link href="/" className="hover:text-orange-300 transition">Home</Link></li>
            <li><Link href="/services" className="hover:text-orange-300 transition">Services</Link></li>
            <li><Link href="/about" className="hover:text-orange-300 transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-orange-300 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Right: Contact & Gas Safe */}
        <div className="flex flex-col gap-6 w-full md:w-auto">
          <div className="flex flex-row gap-8 items-start">
            
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-6 text-white">CONTACT US</h3>
              <p className="text-sm">24 The Roundway Watford<br />WD18 6LB</p>
              <p className="mt-4 font-semibold text-white">Phone: +447800657141</p>
              <p className="font-semibold text-white">Email: info@arheatingservice.co.uk</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Link href="https://www.gassaferegister.co.uk/find-an-engineer/check-a-business/?id=z6Bj0%2b9BiC3wfVafaxt2%2bA%3d%3d&st=registration" target="_blank" rel="noopener noreferrer">
                <NextImage 
                  src="/gas-register.png" 
                  alt="Gas Safe" 
                  width={120} 
                  height={120} 
                  className="cursor-pointer"
                />
              </Link>
              <Link href="/sitemap" className="text-orange-400 font-bold hover:underline whitespace-nowrap">
                Site Map
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/20 text-center text-sm">
        <p>© Copyright AR Heating. All Rights Reserved</p>
        <p className="mt-2">Designed and Developed by <span className="text-orange-300 font-bold">TEQNOOR</span></p>
      </div>
    </footer>
  );
}