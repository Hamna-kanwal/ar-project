import React from 'react';
import { MapPin, CheckCircle2 } from 'lucide-react';

const areas = [
  "Watford", "Harrow", "Pinner", "Uxbridge", "Southall", 
  "Ealing", "Edgware", "Northolt", "Stanmore", "Wembley", "London"
];

export default function AreasWeCover() {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Hero Header with Background Image */}
      <section className="relative w-full h-[300px] flex items-center justify-center overflow-hidden">
        <img 
          src="/location.jpg" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Areas We Cover Background" 
        />
        <div className="absolute inset-0 bg-[#027cc1]/85" /> {/* Blue Overlay */}
        
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl font-bold mb-2">Areas We Cover</h1>
          <p className="text-lg opacity-90">Professional heating and plumbing services in your neighborhood.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Map Placeholder Card */}
        <div className="bg-white p-4 rounded-3xl shadow-lg border border-gray-100">
          <div className="w-full h-[450px] bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39686.08862215467!2d-0.4170669!3d51.5835688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876694602f0684f%3A0x29671d187768a419!2sHarrow!5e0!3m2!1sen!2suk!4v1625575000000" 
              className="w-full h-full border-0" 
              title="Service Area Map"
            />
          </div>
        </div>

        {/* Areas List */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Service Locations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {areas.map((area, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 hover:border-orange-300 transition group">
                <CheckCircle2 className="text-orange-500 w-5 h-5" />
                <span className="font-medium text-gray-700 group-hover:text-orange-600 transition">{area}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-10 p-6 bg-[#027cc1] rounded-2xl text-white shadow-xl">
            <div className="flex items-center gap-4">
              <MapPin className="w-10 h-10 text-orange-400" />
              <div>
                <h4 className="font-bold text-lg">Don't see your area?</h4>
                <p className="text-blue-100 text-sm">Call us to check if we can reach you for emergency repairs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}