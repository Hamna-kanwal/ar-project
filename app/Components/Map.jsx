"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom Icon
const customRedIcon = new L.DivIcon({
  html: `<svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 0C6.71573 0 0 6.71573 0 15C0 24.1667 15 42 15 42C15 42 30 24.1667 30 15C30 6.71573 23.2843 0 15 0Z" fill="#D32F2F"/><circle cx="15" cy="15" r="5" fill="white"/></svg>`,
  className: '',
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -42]
});

const Map = () => {
  // Yahan naye coordinates hain
  const position = [51.64305867079674, -0.41540312513343675];

  return (
    <MapContainer 
      center={position} 
      zoom={16} // Zoom thoda adjust kiya hai taaki address clear dikhe
      style={{ height: '460px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      <Marker position={position} icon={customRedIcon}>
        <Popup>
          <div className="p-2 font-sans">
            <h4 className="font-bold text-[#027cc1] m-0">Head Office</h4>
            <p className="text-sm text-gray-600 m-0">24 The Roundway, Watford WD18 6LB, UK</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;