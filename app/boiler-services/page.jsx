"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Wrench, Settings, Home, CheckCircle2 } from 'lucide-react';
import NextImage from 'next/image';

const serviceData = {
  "boiler-installation": {
    title: "Boiler Installation",
    desc: "Our Gas Safe engineers specialise in fitting world-class eco-efficient boilers tailored to your home's needs.",
    icon: <Wrench size={32} />,
    heroImg: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2000",
    sections: [
      { subtitle: "Boiler Replacement", text: "Old boilers become inefficient and costly. We provide modern, A-rated replacements that significantly lower your energy bills.", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a265e?q=80&w=800" },
      { subtitle: "Top-Tier Brands", text: "We install industry-leading brands including Vaillant, Worcester Bosch, Baxi, and Viessmann for maximum reliability.", img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800" }
    ]
  },
  "boiler-repairs": {
    title: "Boiler Repairs",
    desc: "Sudden breakdown? Our expert engineers provide rapid, reliable solutions to get your heating back on track.",
    icon: <Settings size={32} />,
    heroImg: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000",
    sections: [
      { subtitle: "Expert Diagnosis", text: "We use advanced diagnostic tools to pinpoint the root cause of the breakdown, ensuring we fix the problem, not just the symptom.", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800" },
      { subtitle: "Guaranteed Repairs", text: "All our repairs are carried out to the highest standard, offering you long-term peace of mind and performance.", img: "https://images.unsplash.com/photo-1530124566582-a61fd8415e85?q=80&w=800" }
    ]
  },
  "boiler-servicing": {
    title: "Boiler Servicing",
    desc: "Maintain your boiler's health and efficiency with our comprehensive annual service checks.",
    icon: <Home size={32} />,
    heroImg: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2000",
    sections: [
      { subtitle: "Full Safety Inspection", text: "We test pressure, ventilation, and flue integrity to ensure your appliance meets all current UK safety regulations.", img: "https://images.unsplash.com/photo-1621905252507-b35496cc04f4?q=80&w=800" },
      { subtitle: "Peak Efficiency", text: "A serviced boiler runs cleaner and quieter, helping you save money on monthly energy costs while extending your unit's lifespan.", img: "https://images.unsplash.com/photo-1517430816045-df467de37346?q=80&w=800" }
    ]
  }
};

function ServicesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabFromUrl = searchParams.get('tab') || 'boiler-installation';
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  useEffect(() => {
    setActiveTab(tabFromUrl);
  }, [tabFromUrl]);

  const handleTabChange = (slug) => {
    setActiveTab(slug);
    router.push(`?tab=${slug}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[700px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('${serviceData[activeTab].heroImg}')` }} 
        />
        <div className="absolute inset-0" /> 
        <div className="relative z-10 text-center px-6 max-w-4xl pt-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[#027cc1]">
            {serviceData[activeTab].title}
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            {serviceData[activeTab].desc}
          </p>
        </div>
      </section>

      {/* Sticky Tabs */}
   {/* Sticky Tabs - Border hata diya gaya hai */}
      <div className="sticky top-0 z-40 py-4">
        <div className="max-w-4xl mx-auto flex justify-center gap-2 overflow-x-auto px-4">
          {Object.keys(serviceData).map((slug) => (
            <button
              key={slug}
              onClick={() => handleTabChange(slug)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all whitespace-nowrap border ${
                activeTab === slug 
                  ? "bg-[#027cc1] border-[#027cc1] text-white shadow-lg" 
                  : "bg-white border-gray-200 text-gray-600 hover:border-[#027cc1] hover:text-[#027cc1]"
              }`}
            >
              {serviceData[slug].title}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Content Sections */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="space-y-16">
          {serviceData[activeTab].sections.map((section, idx) => (
            <div key={idx} className="grid md:grid-cols-2 gap-12 items-center bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className={idx % 2 !== 0 ? "md:order-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="text-orange-500" />
                  <h2 className="text-2xl font-bold text-gray-900">{section.subtitle}</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">{section.text}</p>
              </div>
              <div className={`relative h-64 w-full rounded-2xl overflow-hidden shadow-md ${idx % 2 !== 0 ? "md:order-1" : ""}`}>
                {/* Note: Next.js mein external images ke liye next.config.js mein 'images.remotePatterns' set karna hoga */}
                <img 
                  src={section.img} 
                  alt={section.subtitle} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gray-900 py-20 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to book your service?</h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">Get a free no-obligation quote from our professional engineers today.</p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105">
          Call Now: 0800 XXX XXX
        </button>
      </section>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <ServicesContent />
    </Suspense>
  );
}