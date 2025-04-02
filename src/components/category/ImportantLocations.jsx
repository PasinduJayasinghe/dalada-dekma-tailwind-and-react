import React, { useState, useEffect } from "react";
import Grid from "../Grid";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Leaflet styles
import ImportantLocationsGrid from "./ImportantLocationsGrid";

// Example data - in a real app, you'd fetch this from your backend
const initialLocations = [
  {
    name: "Main Entrance",
    coordinates: [7.2906, 80.6337],
    timestamp: "March 28, 2024 - 10:00 AM",
    description: "Located at Sri Dalada Maligawa main gate. Please arrive 30 minutes before your scheduled time."
  },
  {
    name: "Information Center",
    coordinates: [7.2910, 80.6340],
    timestamp: "March 28, 2024 - 9:30 AM",
    description: "Visit our information center near the main entrance for any assistance."
  },
  {
    name: "Cafeteria",
    coordinates: [7.2920, 80.6350],
    timestamp: "March 28, 2024 - 11:00 AM",
    description: "Refreshments and meals available from 7:00 AM to 8:00 PM."
  },
  {
    name: "Parking Area",
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
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-300">Important Locations</h2>

      {loading ? (
        <div className="text-center py-8">
          <p>Loading locations...</p>
        </div>
      ) : (
        <>
          {/* Map View */}
          <div className="mb-6">
            <MapContainer center={centerPoint} zoom={15} style={{ height: "400px", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {locations.map((location, index) => (
                <Marker key={index} position={location.coordinates}>
                  <Popup>
                    <h3 className="text-lg font-bold">{location.name}</h3>
                    <p className="text-sm">{location.timestamp}</p>
                    <p>{location.description}</p>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Grid View */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Location Details</h3>
            <ImportantLocationsGrid locations={locations} />
          </div>

          {/* List View (original implementation) */}
        
        </>
      )}
    </div>
  );
}

export default ImportantLocations;