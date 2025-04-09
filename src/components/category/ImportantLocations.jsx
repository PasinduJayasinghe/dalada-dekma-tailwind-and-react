import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import AnimationSequence from "../Animation/AnimationSequence";

const LOCATION_DATA = [
  {
    id: 1,
    name: "ප්‍රධාන දොරටුව",
    coordinates: [7.2906, 80.6337],
    timestamp: "March 28, 2024 - 10:00 AM",
    description: "Located at Sri Dalada Maligawa main gate. Please arrive 30 minutes before your scheduled time."
  },
  {
    id: 2,
    name: "තොරතුරු කේන්ද්‍රය",
    coordinates: [7.2910, 80.6340],
    timestamp: "March 28, 2024 - 9:30 AM",
    description: "Visit our information center near the main entrance for any assistance."
  },
  {
    id: 3,
    name: "ආපනශාලාව",
    coordinates: [7.2920, 80.6350],
    timestamp: "March 28, 2024 - 11:00 AM",
    description: "Refreshments and meals available from 7:00 AM to 8:00 PM."
  },
  {
    id: 4,
    name: "වාහන නැවැත්වීම්",
    coordinates: [7.2930, 80.6360],
    timestamp: "March 28, 2024 - 12:00 PM",
    description: "Designated parking areas available at Kandy Lake View Parking and City Center Parking."
  },
];

const DEFAULT_CENTER = [7.2906, 80.6337];

function ImportantLocations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setLocations(LOCATION_DATA);
      } catch (err) {
        console.error("Error fetching locations:", err);
        setError("Failed to load locations");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const calculateCenter = () => {
    if (locations.length === 0) return DEFAULT_CENTER;
    
    const sum = locations.reduce((acc, loc) => {
      return [acc[0] + loc.coordinates[0], acc[1] + loc.coordinates[1]];
    }, [0, 0]);
    
    return [sum[0] / locations.length, sum[1] / locations.length];
  };

  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-300"></div>
        <span className="ml-4">Loading announcements...</span>
      </div>
    );
  }

  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (locations.length === 0) return <div className="text-center py-8">No locations found</div>;

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-6 pb-2 border-b border-amber-300" style={{ fontFamily: "TharuDigitalRun"}}>
        {'jeo.;a ia:dk'}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimationSequence 
          direction="right" 
          baseDelay={100} 
          staggerDelay={150} 
          duration={800} 
          distance={30} 
          easing="ease-out"
          className="contents"
        >
          {locations.map(location => (
            <LocationCard key={location.id} location={location} />
          ))}
        </AnimationSequence>
      </div>
    </div>
  );
}

const LocationCard = ({ location }) => (
  <div className="bg-[#f6aa1c] bg-opacity-10 p-4 rounded-lg shadow-lg border border-[#220901] border-opacity-20 transition-all hover:shadow-xl hover:scale-[1.01]">
    <p className="text-sm text-[#220901] opacity-80 mb-2 font-medium">
      {location.timestamp}
    </p>
    
    <div 
      className="bg-gradient-to-r from-[#941B0C] to-[#BC3908] p-3 rounded-lg shadow-inner"
      style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}
    >
      <h3 
        className="text-lg font-bold text-[#f6aa1c] text-center tracking-wide"
        style={{ 
          fontFamily: "NotoSansSinhala",
          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
        }}
      >
        {location.name}
      </h3>
    </div>
    
    <div className="h-40 w-full mt-3 rounded-lg overflow-hidden border-2 border-[#621708] border-opacity-30">
      <MapContainer
        center={location.coordinates}
        zoom={16}
        style={{ 
          height: "100%", 
          width: "100%",
          filter: 'sepia(20%) saturate(120%)' // Vintage map effect
        }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker 
          position={location.coordinates}
          icon={new L.Icon({
            iconUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23BC3908"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
          })}
        >
          <Popup className="font-bold text-[#621708]">
            {location.name}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
    
    <div className="flex justify-between mt-3 text-xs">
      <span className="text-[#220901] opacity-70">
        Lat: {location.coordinates[0].toFixed(4)}
      </span>
      <span className="text-[#220901] opacity-70">
        Lng: {location.coordinates[1].toFixed(4)}
      </span>
    </div>
  </div>
);

export default ImportantLocations;