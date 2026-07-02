"use client";
import dynamic from 'next/dynamic';
import React from 'react';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => <div className="h-[420px] w-full bg-gray-100 flex items-center justify-center">Loading map...</div>
});

const MapSection = () => {
  const position = [52.93305760241794, -1.1750254423281978];

  return (
    <div className="w-full h-full">
      <div className="rounded-3xl overflow-hidden shadow-md relative z-0 mt-6 h-full min-h-[420px]">
        <LeafletMap position={position} />
      </div>
    </div>
  );
};

export default MapSection;