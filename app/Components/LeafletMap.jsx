"use client";
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ position }) => {
  const [leafletLib, setLeafletLib] = useState(null);

  useEffect(() => {
    import('leaflet').then((L) => setLeafletLib(L));
  }, []);

  if (!leafletLib) {
    return <div className="h-[420px] w-full bg-gray-100 flex items-center justify-center">Loading map...</div>;
  }

  const customRedIcon = new leafletLib.DivIcon({
    html: `<svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 0C6.71573 0 0 6.71573 0 15C0 24.1667 15 42 15 42C15 42 30 24.1667 30 15C30 6.71573 23.2843 0 15 0Z" fill="#D32F2F"/><circle cx="15" cy="15" r="5" fill="white"/></svg>`,
    className: '',
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -42]
  });

  return (
    <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }} attributionControl={false} zoomControl={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={customRedIcon}>
        <Popup>
          <div className="p-2">
            <h4 className="font-bold text-[#027cc1] m-0">Head Office</h4>
            <p className="text-xs text-gray-600 m-0">Clements Ln, Ilford</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
