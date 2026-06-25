"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
 
 
  { label: "Why AR-Heating", href: "/about" },
  { label: "About Us", href: "/expertise" },
  { label: "Area We Cover", href: "/complaints-procedure" },
  { label: "Landlord Certificate", href: "/contact" },
  { label: "Blogs", href: "/contact" },
  { label: "Contact Us", href: "/contact" },
];

export default function Sidebar({ isOpen, onClose }) {
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[380px] bg-white z-[110] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <button onClick={onClose} className="flex bg-[#0077b6] items-center gap-2 font-bold text-white rounded-[30px] px-4 py-2">
                <ChevronLeft className="w-6 h-6" /> Back
              </button>
             
            </div>

            {/* Links */}
            <nav className="flex-1 p-6 overflow-y-auto">
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.label}>
                    {item.isDropdown ? (
                      <div className="space-y-2">
                        <button
                          onClick={() => setServicesOpen(!servicesOpen)}
                          className="w-full flex items-center justify-between p-4 bg-[#0077b6] text-white rounded-[12px] hover:bg-[#005f8f] transition-all font-bold"
                        >
                          <span>{item.label}</span>
                          <ChevronDown className={`w-5 h-5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                        </button>
                        {servicesOpen && (
                          <ul className="pl-4 space-y-2 border-l-2 border-[#0077b6] ml-2">
                            {item.subItems.map((sub) => (
                              <li key={sub.label}>
                                <Link href={sub.href} onClick={onClose} className="block p-3 text-sm text-[#0077b6] font-bold hover:bg-blue-50 rounded-[8px]">
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center justify-between p-4 bg-[#0077b6] text-white rounded-[12px] hover:bg-[#005f8f] transition-all font-bold"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}