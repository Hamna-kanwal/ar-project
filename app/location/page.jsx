"use client";
import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const areas = [
  { id: 1, name: "Watford", position: [51.6565, -0.3903] },
  { id: 2, name: "Harrow", position: [51.5806, -0.3421] },
  { id: 3, name: "Pinner", position: [51.5945, -0.3800] },
  { id: 4, name: "Uxbridge", position: [51.5472, -0.4735] },
  { id: 5, name: "Southall", position: [51.5098, -0.3756] },
  { id: 6, name: "Ealing", position: [51.5144, -0.3035] },
  { id: 7, name: "Edgware", position: [51.6136, -0.2764] },
  { id: 8, name: "Northolt", position: [51.5518, -0.3587] },
  { id: 9, name: "Stanmore", position: [51.6190, -0.3150] },
  { id: 10, name: "Wembley", position: [51.5555, -0.2974] },
  { id: 11, name: "London", position: [51.5074, -0.1278] }
];

export default function AreasWeCover() {
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState(null);

  useEffect(() => {
    setIsClient(true);
    import('leaflet').then((module) => setL(module));
  }, []);

  const customRedIcon = L ? new L.DivIcon({
    className: 'custom-red-marker',
    html: `<svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 0C6.71573 0 0 6.71573 0 15C0 24.1667 15 42 15 42C15 42 30 24.1667 30 15C30 6.71573 23.2843 0 15 0Z" fill="#D32F2F"/><circle cx="15" cy="15" r="5" fill="white"/></svg>`,
    iconSize: [30, 42],
    iconAnchor: [15, 42]
  }) : null;

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Hero Header */}
      <section className="relative w-full h-[300px] flex items-center justify-center overflow-hidden">
        <img 
          src="/location.jpg" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Areas We Cover Background" 
        />
        <div className="absolute inset-0 bg-[#027cc1]/40" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[#027cc1]">
            Area We <span className="text-orange-500">Cover</span>
          </h1>
          <p className="text-lg opacity-90">Professional heating and plumbing services in your neighborhood.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        
        {/* Map Section */}
        <div className="bg-white p-4 rounded-3xl shadow-lg border border-gray-100 h-[450px]">
          {isClient && L ? (
            <MapContainer center={[51.55, -0.32]} zoom={11} className="h-full w-full rounded-2xl">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {areas.map((area) => (
                <Marker key={area.id} position={area.position} icon={customRedIcon}>
                  <Popup>{area.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : <div className="h-full w-full bg-gray-200 animate-pulse rounded-2xl" />}
        </div>

        {/* Areas List */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Service Locations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {areas.map((area) => (
              <div key={area.id} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 hover:border-red-300 transition group shadow-sm">
                <MapPin className="text-red-500 w-5 h-5" />
                <span className="font-medium text-gray-700 group-hover:text-red-600 transition">{area.name}</span>
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