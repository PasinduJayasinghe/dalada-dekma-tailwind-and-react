import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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

  if (loading) return <div className="text-center py-8">Loading locations...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (locations.length === 0) return <div className="text-center py-8">No locations found</div>;

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-6 pb-2 border-b border-gray-300">
        වැදගත් ස්ථාන
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {locations.map(location => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </div>
  );
}

const LocationCard = ({ location }) => (
  <div className="bg-yellow-50 p-4 rounded-lg shadow-md">
    <p className="text-sm text-gray-600 mb-2">{location.timestamp}</p>
    <div className="bg-yellow-500 p-3 rounded-lg">
      <h3 className="text-lg font-bold text-black text-center">{location.name}</h3>
    </div>
    <div className="h-40 w-full mt-2 rounded-lg overflow-hidden">
      <MapContainer
        center={location.coordinates}
        zoom={16}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={location.coordinates}>
          <Popup>{location.name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  </div>
);

export default ImportantLocations;