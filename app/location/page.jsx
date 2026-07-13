import React from 'react';
import { MapPin } from 'lucide-react';

const areas = [
  "Watford", "Harrow", "Pinner", "Uxbridge", "Southall", 
  "Ealing", "Edgware", "Northolt", "Stanmore", "Wembley", "London"
];

export default function AreasWeCover() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#027cc1]/40" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[#027cc1]">
            Area We <span className="text-orange-500">Cover</span>
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Map Placeholder */}
        <div className="bg-white p-4 rounded-3xl shadow-lg border border-gray-100">
          <div className="w-full h-[450px] bg-gray-200 rounded-2xl overflow-hidden">
            <iframe 
              src="PASTE_YOUR_GOOGLE_MAPS_EMBED_LINK_HERE" 
              className="w-full h-full border-0" 
              title="Service Area Map"
            />
          </div>
        </div>

        {/* Areas List with Icons */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Service Locations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {areas.map((area, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 hover:border-red-500 transition group shadow-sm"
              >
                {/* Red Location Icon for every item */}
                <MapPin className="text-red-500 w-5 h-5 flex-shrink-0" /> 
                <span className="font-medium text-gray-700 group-hover:text-red-600 transition">
                  {area}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}