import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const DEFAULT_CENTER = [7.2906, 80.6337]; // If no locations are found, default to Sri Lanka's coordinates

function ImportantLocations() {
  // State to store locations data
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchLocationsData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/locations"); // Replace with your API endpoint

        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        setLocations(data);
        setLoading(false);
        setError(null); // Clear any previous error
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLocationsData();
  }, []);

  // Center calculation based on locations
  const calculateCenter = () => {
    if (locations.length === 0) return DEFAULT_CENTER;
    
    const sum = locations.reduce((acc, loc) => {
      return [acc[0] + loc.coordinates[0], acc[1] + loc.coordinates[1]];
    }, [0, 0]);
    
    return [sum[0] / locations.length, sum[1] / locations.length];
  };

  const center = calculateCenter();

  if (loading) return <div className="text-center py-8">ස්ථාන තොරතුරු පූරනය වෙමින්වෙමින්...</div>;
  if (error) return <div className="text-center py-8 text-red-500">දත්ත ලබා ගැනීමේ දෝෂයකි: {error}</div>;
  if (locations.length === 0) return <div className="text-center py-8">ස්ථාන තොරතුරු යාවත්කාලීන කිරීම් නොමැත.</div>;

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