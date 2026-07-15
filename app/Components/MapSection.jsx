"use client";

import { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultAreas = [
  {
    id: 'office',
    name: 'Head Office',
    position: [51.64305867079674, -0.41540312513343675],
    description: '24 The Roundway, Watford WD18 6LB, UK',
  },
];

export default function MapSection({ areas = defaultAreas }) {
  const mapAreas = areas.length ? areas : defaultAreas;

  const icon = useMemo(() => {
    return new L.DivIcon({
      html: `<svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 0C6.71573 0 0 6.71573 0 15C0 24.1667 15 42 15 42C15 42 30 24.1667 30 15C30 6.71573 23.2843 0 15 0Z" fill="#D32F2F"/><circle cx="15" cy="15" r="5" fill="white"/></svg>`,
      className: '',
      iconSize: [30, 42],
      iconAnchor: [15, 42],
      popupAnchor: [0, -42],
    });
  }, []);

  const center = mapAreas[0]?.position || defaultAreas[0].position;

  return (
    <div className="w-full min-h-[420px] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={false}
        style={{ width: '100%', minHeight: '420px', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {mapAreas.map((area) => (
          <Marker key={area.id} position={area.position} icon={icon}>
            <Popup>
              <div className="space-y-1">
                <h3 className="font-bold text-[#027cc1]">{area.name}</h3>
                {area.description && <p className="text-sm text-gray-600">{area.description}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
