"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customRedIcon = new L.DivIcon({
  className: 'custom-red-marker',
  html: `<svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 0C6.71573 0 0 6.71573 0 15C0 24.1667 15 42 15 42C15 42 30 24.1667 30 15C30 6.71573 23.2843 0 15 0Z" fill="#D32F2F"/><circle cx="15" cy="15" r="5" fill="white"/></svg>`,
  iconSize: [30, 42],
  iconAnchor: [15, 42]
});

export default function MapComponent({ areas }) {
  return (
    <MapContainer center={[51.55, -0.32]} zoom={11} className="h-full w-full rounded-2xl">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {areas.map((area) => (
        <Marker key={area.id} position={area.position} icon={customRedIcon}>
          <Popup>{area.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}