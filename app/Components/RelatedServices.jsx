import Link from 'next/link';

export default function RelatedServices() {
  const services = [
    { title: "General Plumbing", path: "/Services/general-plumbing" },
    { title: "Megaflo Systems", path: "/Services/megaflo" },
    { title: "Landlord Services", path: "/Services/landlord" },
    { title: "General Installation", path: "/Services/general-installation" },
    { title: "Emergency Services", path: "/Services/emergency-services" },
    { title: "Washing Machine Installation", path: "/Services/washing-machine" },
    { title: "Central Heating", path: "/Services/central-heating" },
    { title: "Gas Cooker Installation", path: "/Services/gas-cooker" },
    { title: "Thermostat Installation", path: "/Services/thermostat-installation" },
    { title: "Boiler Services", path: "/Services/boiler" },
    { title: "Nest Thermostat", path: "/Services/nest" },
    { title: "Hive Thermostat", path: "/Services/hive" },
    { title: "Underfloor Heating", path: "/Services/underfloor-heating" },
    { title: "Boiler Breakdown", path: "/Services/boiler-breakdown" }
  ];

  return (
    <section className="my-10 p-6 bg-slate-50 rounded-xl border border-slate-200">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Explore Our Other Services</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {services.map((service, index) => (
          <Link 
            key={index} 
            href={service.path} 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium bg-white p-3 rounded-lg border border-slate-100 shadow-xs transition"
          >
            {/* Chota sa Orange Wrench/Tool Symbol */}
            <svg 
              className="w-4 h-4 text-orange-600 shrink-0" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            <span>{service.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}