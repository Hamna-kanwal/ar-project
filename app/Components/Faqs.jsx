"use client";
import { useState } from "react";
import defaults from "../_defaults/home.json";

export default function FAQSection({ content }) {
  const heading = content?.heading || defaults.faqs.heading;
  const faqs = Array.isArray(content?.items) && content.items.length > 0 ? content.items : defaults.faqs.items;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-10">{heading}</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`border-2 rounded-xl overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "border-orange-500" : "border-gray-200"}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className={`w-full p-6 text-left font-semibold flex justify-between items-center transition-colors duration-300 ${isOpen ? "bg-orange-50" : "bg-white hover:bg-gray-50"}`}
                >
                  <span className="text-gray-900 font-bold">{faq.q}</span>
                  <span className="w-8 h-8 flex items-center justify-center rounded-full text-white font-bold transition-transform duration-300 bg-orange-500">
                    {isOpen ? "×" : "+"}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="p-6 pt-0 text-gray-600 bg-white">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}