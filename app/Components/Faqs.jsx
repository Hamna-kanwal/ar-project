"use client";
import { useState } from 'react';

const faqs = [
  { q: "How much does a new boiler cost in Watford?", a: "A new combi boiler installation typically costs between £1,800 and £3,500, including installation and warranty, depending on brand and complexity. AR Heating Services gives free fixed-price quotes. Call 07800 657141 for an exact price for your home." },
  { q: "How quickly can you attend an emergency? ", a: "Our engineers reach most addresses in Watford, Harrow, Hemel Hempstead and St. Albans within 60–90 minutes, 24 hours a day, 7 days a week. " },
  { q: "Are you Gas Safe registered?", a: "Yes, AR Heating Services is Gas Safe registered (No. 574111). You can verify our registration on the official Gas Safe Register via the badge in our footer." },
    { q: "How often should a boiler be serviced?", a: "Once every 12 months. Annual servicing keeps your manufacturer's warranty valid, maintains efficiency and checks for dangerous faults. Landlords must have gas appliances checked annually (CP12)." },
    { q: "Do I need a power flush? ", a: "If your radiators are cold at the bottom, slow to heat, or your boiler is noisy, sludge build-up is the likely cause. A power flush removes it and restores performance." },
    { q: "Do you offer free quotes? ", a: "Yes, all quotes are free and no-obligation, with fixed prices agreed in writing before any work begins." },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className={`border-2 rounded-xl overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'border-orange-500' : 'border-gray-200'}`}
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className={`w-full p-6 text-left font-semibold flex justify-between items-center transition-colors duration-300 ${isOpen ? 'bg-orange-50' : 'bg-white hover:bg-gray-50'}`}
                >
                  <span className="text-gray-900 font-bold">{faq.q}</span>
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold transition-transform duration-300 ${isOpen ? 'bg-orange-500' : 'bg-orange-500'}`}>
                    {isOpen ? '×' : '+'}
                  </span>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
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