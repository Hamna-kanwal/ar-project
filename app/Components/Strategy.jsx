import React from 'react';
import { Settings, ShieldCheck, MapPin } from 'lucide-react';

export default function Strategy() {
  const features = [
    {
      title: "Our Strategy",
      description: " Fixed prices quoted upfront, quality parts, and workmanship guaranteed. Efficient, honest heating services at prices local families can afford.",
       icon: <Settings size={32} className="text-[#005f93]" />
    },
    {
      title: "Our Priority",
      description: "Your safety and satisfaction. Every engineer is Gas Safe registered (No. 574111). Verify us on the official Gas Safe Register before we even arrive. All gas work is carried out by qualified professionals only.",
      icon: <ShieldCheck size={32} className="text-[#005f93]" />
    },
    {
      title: "Our Coverage",
      description: " Based in Watford and minutes from Harrow, Hemel Hempstead, St. Albans, Bushey, Stanmore, Edgware, Ruislip, Northolt and Greater London, which is how we keep emergency response times to 60–90 minutes.",
      icon: <MapPin size={32} className="text-[#005f93]" />
    }
  ];

  return (
    <section className="py-20 bg-[#f3f4f6] px-6">
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((item, index) => (
          <div 
            key={index} 
            className="bg-[#005f93] text-white p-10 rounded-[2rem] shadow-xl shadow-gray-200/50 flex flex-col items-center text-center transition-all hover:translate-y-[-10px]"
          >
            <div className="mb-6 p-4 bg-[#e0f2fe] rounded-2xl">
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
            <p className="text-white leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}