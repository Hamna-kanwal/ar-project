"use client";
import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import dynamic from 'next/dynamic'

// Sahi path: ../ nikalne ke liye (1: location se bahar, 2: app folder se bahar)
const MapComponent = dynamic(() => import('../Components/MapSection'), {
  ssr: false,
  loading: () => <div className="h-[450px] w-full bg-gray-200 animate-pulse rounded-2xl" />
});

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
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <section className="relative w-full h-[300px] flex items-center justify-center overflow-hidden">
        <img src="/location.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Background" />
        <div className="absolute inset-0 bg-[#027cc1]/40" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl font-bold text-[#027cc1]">Area We <span className="text-orange-500">Cover</span></h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="bg-white p-4 rounded-3xl shadow-lg h-[450px]">
          <MapComponent areas={areas} />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Service Locations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {areas.map((area) => (
              <div key={area.id} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 hover:border-red-300 transition shadow-sm">
                <MapPin className="text-red-500 w-5 h-5" />
                <span className="font-medium text-gray-700">{area.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}