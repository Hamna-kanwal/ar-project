"use client";
import React, { useState, useEffect } from 'react';

const MapSection = () => {
  // 1. Hamesha initial state empty array [] rakhein
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Agar aap API se data la rahe hain to yahan fetch karein
    // Example:
    // fetch('/api/locations').then(res => res.json()).then(data => setLocations(data));
  }, []);

  return (
    <div className="w-full h-full min-h-[300px] bg-gray-200 rounded-2xl overflow-hidden flex items-center justify-center">
      {/* 2. Optional chaining (.?) ka use karein */}
      {locations?.length > 0 ? (
        <div className="w-full">
          {locations.map((loc, index) => (
            <div key={index} className="p-4 bg-white m-2 rounded-lg">
              {loc.name}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 font-medium">
          {/* Map placeholder ya API se loading message */}
          Map View Area
        </div>
      )}
    </div>
  );
};

export default MapSection;