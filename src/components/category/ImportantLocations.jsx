import React, { useState, useEffect } from "react";
import Grid from "../Grid";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Leaflet styles
import ImportantLocationsGrid from "./ImportantLocationsGrid";

// Example data - in a real app, you'd fetch this from your backend
const initialLocations = [
  {
    name: "ප්‍රධාන දොරටුව",
    coordinates: [7.2906, 80.6337],
    timestamp: "March 28, 2024 - 10:00 AM",
    description: "Located at Sri Dalada Maligawa main gate. Please arrive 30 minutes before your scheduled time."
  },
  {
    name: "තොරතුරු කේන්ද්‍රය",
    coordinates: [7.2910, 80.6340],
    timestamp: "March 28, 2024 - 9:30 AM",
    description: "Visit our information center near the main entrance for any assistance."
  },
  {
    name: "ආපනශාලාව",
    coordinates: [7.2920, 80.6350],
    timestamp: "March 28, 2024 - 11:00 AM",
    description: "Refreshments and meals available from 7:00 AM to 8:00 PM."
  },
  {
    name: "වාහන නැවැත්වීම්",
    coordinates: [7.2930, 80.6360],
    timestamp: "March 28, 2024 - 12:00 PM",
    description: "Designated parking areas available at Kandy Lake View Parking and City Center Parking."
  },
];

function ImportantLocations() {
  const [locations, setLocations] = useState(initialLocations);
  const [loading, setLoading] = useState(false);

  // In a real application, you would fetch locations from your backend
  useEffect(() => {
    // Example of how you might fetch locations from an API
    const fetchLocations = async () => {
      setLoading(true);
      try {
        // const response = await fetch('/api/locations');
        // const data = await response.json();
        // setLocations(data);
        
        // For now, just use our initial data with a small delay to simulate loading
        setTimeout(() => {
          setLocations(initialLocations);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Calculate center point based on locations or use default
  const centerPoint = locations.length > 0 
    ? [
        locations.reduce((sum, loc) => sum + loc.coordinates[0], 0) / locations.length,
        locations.reduce((sum, loc) => sum + loc.coordinates[1], 0) / locations.length
      ] 
    : [7.2906, 80.6337];

  return (
    
    <div>
    <h2 className="text-2xl font-bold text-center mb-4 border-b pb-2 border-gray-300">
    වැදගත් ස්ථාන
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {locations.map((location, index) => (
        <div key={index} className="grid-container bg-yellow-50 p-4 rounded-lg shadow-md">
          <p className="text-sm text-gray-600 mb-2">{location.timestamp}</p>
          <div className=" bg-yellow-500 p-3 rounded-lg">
            <h3 className="text-lg font-bold text-black text-center">{location.name}</h3>
            
          </div>
          <div className="h-40 w-full mt-2 rounded-lg overflow-hidden">
            <MapContainer
              center={location.coordinates}
              zoom={16}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={location.coordinates}>
                <Popup>{location.name}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}

export default ImportantLocations;