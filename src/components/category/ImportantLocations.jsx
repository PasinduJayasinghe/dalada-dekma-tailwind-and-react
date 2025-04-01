import React from "react";
import Grid from "../Grid";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Leaflet styles
import { LatLngExpression } from "leaflet";

// Coordinates for the important locations (replace with actual locations)
const locations = [
  {
    name: "Main Entrance",
    coordinates: [7.2906, 80.6337], // Example coordinates, replace with actual ones
    timestamp: "March 28, 2024 - 10:00 AM",
  },
  {
    name: "Information Center",
    coordinates: [7.2910, 80.6340], // Example coordinates, replace with actual ones
    timestamp: "March 28, 2024 - 9:30 AM",
  },
  {
    name: "Cafeteria",
    coordinates: [7.2920, 80.6350], // Example coordinates, replace with actual ones
    timestamp: "March 28, 2024 - 11:00 AM",
  },
  {
    name: "Parking Area",
    coordinates: [7.2930, 80.6360], // Example coordinates, replace with actual ones
    timestamp: "March 28, 2024 - 12:00 PM",
  },
];

function ImportantLocations() {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-300">Important Locations</h2>

      <MapContainer center={[7.2906, 80.6337]} zoom={15} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location, index) => (
          <Marker key={index} position={location.coordinates}>
            <Popup>
              <h3 className="text-lg font-bold">{location.name}</h3>
              <p>{location.timestamp}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {locations.map((location, index) => (
        <Grid key={index} timestamp={location.timestamp}>
          <div>
            <h3 className="text-lg font-bold mb-2">{location.name}</h3>
          </div>
        </Grid>
      ))}
    </div>
  );
}

export default ImportantLocations;
