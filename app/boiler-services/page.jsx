"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

const serviceData = {
  "boiler-installation": {
    title: "Boiler Installation",
    desc: "It is our priority to gain the trust of our customers and ensure satisfaction with our services provided. Our engineers are Gas Safe qualified and accredited by most of the boiler manufacturers. Our engineers will come fully prepared with all the right tools and skills to install both electric and gas boilers. In addition, you can also benefit from up to 10 years of manufacturer’s guarantee.",
    heroImg: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2000",
    sections: [
      { 
        subtitle: "Boiler Replacement", 
        text: "With regular servicing, some old boiler models can withstand many years of use but decision to replace your old boiler with a new one as repair bills can stack up, especially if you don’t have boiler cover plan. Listed below are some indicators you need a replacement boiler:", 
        img: "/heating_installation.jpg",
        listItems: [
          "Your current boiler is beyond economical repair (BER) and it is cheaper to get a new boiler. The new boiler will provide a saving on your heating bills.",
          "You are experiencing frequent issues like your boiler requires servicing more than once a year and several call out expenses therefore, replacement boiler is the best option.",
          "Your current boiler has poor energy efficiency, leading to expensive gas bills and replacement boiler is the best option.",
          "If your boiler leaks causing expensive call outs, then a replacement boiler will be the best option."
        ]
      },
        { 
        subtitle: "New boiler installation options", 
        text: "Getting a new boiler is a decision that will affect your life for many years to come, that’s why we recommend an A-rated boiler, that is more efficient and cost-effective that will save a lot of trouble in the long run.Listed below are boiler main types you can choose from:Combi boilers are suitable for smaller properties that don’t have additional water tank or need hot water all the time. Combi boilers can be fired by a different type of fuel or electricity.", 
        img: "/heating_installation.jpg",
        listItems: [
          "Your current boiler is beyond economical repair (BER) and it is cheaper to get a new boiler. The new boiler will provide a saving on your heating bills.",
          "You are experiencing frequent issues like your boiler requires servicing more than once a year and several call out expenses therefore, replacement boiler is the best option.",
          "Your current boiler has poor energy efficiency, leading to expensive gas bills and replacement boiler is the best option.",
          "If your boiler leaks causing expensive call outs, then a replacement boiler will be the best option."
        ]
      },
        { 
        subtitle: "New boiler installation options", 
        text: "Regular boilers This type of boiler is perfect for homes with hot water running same time in more than one room. This type will need a hot and cold water storage tank in your loft.System boilers Used in a house with more than one bathroom, they are easier to install and do not require additional space. You provide supply as many hot taps without any limits in number of taps.", 
        img: "/heating_installation.jpg",
        listItems: [
          "Your current boiler is beyond economical repair (BER) and it is cheaper to get a new boiler. The new boiler will provide a saving on your heating bills.",
          "You are experiencing frequent issues like your boiler requires servicing more than once a year and several call out expenses therefore, replacement boiler is the best option.",
          "Your current boiler has poor energy efficiency, leading to expensive gas bills and replacement boiler is the best option.",
          "If your boiler leaks causing expensive call outs, then a replacement boiler will be the best option."
        ]
      },
     
    ]
  },
  "boiler-repairs": {
    title: "Boiler Repairs",
    desc: "Sudden breakdown? Our expert engineers provide rapid, reliable solutions to get your heating back on track.",
    heroImg: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000",
    sections: [
      { subtitle: "Expert Diagnosis", text: "We use advanced diagnostic tools to pinpoint the root cause of the breakdown, ensuring we fix the problem, not just the symptom.", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800" },
      { subtitle: "Guaranteed Repairs", text: "All our repairs are carried out to the highest standard, offering you long-term peace of mind and performance.", img: "https://images.unsplash.com/photo-1530124566582-a61fd8415e85?q=80&w=800" }
    ]
  },
  "boiler-servicing": {
    title: "Boiler Servicing",
    desc: "Maintain your boiler's health and efficiency with our comprehensive annual service checks.",
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
<section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0 bg-cover bg-center transition-all duration-500" style={{ backgroundImage: `url('${serviceData[activeTab].heroImg}')` }} />
  <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/80" /> 
  <div className="relative z-10 text-center px-6 max-w-4xl">
    
    {/* Dynamic Title with Split Coloring */}
    <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[#027cc1]">
      {serviceData[activeTab].title.split(' ').length > 1 ? (
        <>
          {serviceData[activeTab].title.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="text-orange-600">
            {serviceData[activeTab].title.split(' ').slice(-1)}
          </span>
        </>
      ) : (
        serviceData[activeTab].title
      )}
    </h1>

    <p className="text-lg text-gray-800 max-w-2xl mx-auto mt-6 font-medium">{serviceData[activeTab].desc}</p>
  </div>
</section>

      <div className=" top-0 z-40 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto flex justify-center gap-2 overflow-x-auto px-4">
          {Object.keys(serviceData).map((slug) => (
            <button key={slug} onClick={() => handleTabChange(slug)} className={`px-6 py-2.5 rounded-full font-semibold transition-all whitespace-nowrap border ${activeTab === slug ? "bg-[#027cc1] border-[#027cc1] text-white shadow-lg" : "bg-white border-gray-200 text-gray-600 hover:border-[#027cc1] hover:text-[#027cc1]"}`}>
              {serviceData[slug].title}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="space-y-20">
          {serviceData[activeTab].sections.map((section, idx) => (
            <div key={idx} className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">{section.subtitle}</h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">{section.text}</p>
                
                {section.listItems && (
                  <ul className="space-y-4 mb-8">
                    {section.listItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle2 className="text-orange-500 shrink-0 mt-1" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img src={section.img} alt={section.subtitle} className="w-full h-80 object-cover" />
                <div className="absolute bottom-0 left-0 bg-[#027cc1] p-6 text-white w-full md:w-3/4 rounded-tr-3xl">
                  <div className="space-y-1 text-sm font-medium">
                    <p>📞 +447800657141</p>
                    <p>🌐 www.arheatingservice.co.uk</p>
                    <p>✉️ info@arheatingservice.co.uk</p>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="bg-gray-900 py-20 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to book your service?</h2>
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