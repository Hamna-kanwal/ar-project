import React from "react";
import { Settings, ShieldCheck, MapPin } from "lucide-react";
import defaults from "../_defaults/home.json";

// Icons stay in code and are matched to cards by position
const ICONS = [
  <Settings key="s" size={32} className="text-[#005f93]" />,
  <ShieldCheck key="c" size={32} className="text-[#005f93]" />,
  <MapPin key="m" size={32} className="text-[#005f93]" />,
];

export default function Strategy({ content }) {
  const features = Array.isArray(content?.items) && content.items.length > 0 ? content.items : defaults.strategy.items;

  return (
    <section className="py-20 bg-[#f3f4f6] px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-[#005f93] text-white p-10 rounded-[2rem] shadow-xl shadow-gray-200/50 flex flex-col items-center text-center transition-all hover:translate-y-[-10px]"
          >
            <div className="mb-6 p-4 bg-[#e0f2fe] rounded-2xl">
              {ICONS[index % ICONS.length]}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
            <p className="text-white leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}