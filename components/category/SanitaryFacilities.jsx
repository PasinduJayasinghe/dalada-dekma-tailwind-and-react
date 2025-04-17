import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import AnimationSequence from "../Animation/AnimationSequence";

function SanitaryFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const DEFAULT_CENTER = [7.2936, 80.6414];

  useEffect(() => {
    let loadingTimer;
    let fetchInterval;
  
    const fetchFacilities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/locations/category/5');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFacilities(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    loadingTimer = setTimeout(() => {
      fetchFacilities();
      fetchInterval = setInterval(fetchFacilities, 300000);
    }, 500);
  
    return () => {
      clearTimeout(loadingTimer);
      clearInterval(fetchInterval);
    };
  }, []);

  const openInGoogleMaps = (coordinates) => {
    const [lat, lng] = coordinates;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-300"></div>
        <span className="ml-4">Loading sanitary facilities...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading sanitary facilities: {error}
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-4xl font-semibold mb-4 border-b pb-2 border-amber-300 text-center" style={{ fontFamily: "FMBindumathi"}}>
        {'ikSmdrlaIl myiqlï $ jeisls,s'}
        {/* සනීපාරක්ෂක පහසුකම් / වැසිකිලි */}
      </h2>
      {facilities.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No facility locations available at the moment.
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimationSequence 
          direction="up" 
          baseDelay={100} 
          staggerDelay={150} 
          duration={800} 
          distance={30} 
          easing="ease-out"
          className="contents"
        >
          {facilities.map(facility => (
            <div 
              key={facility.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="h-48">
                <MapContainer
                  center={facility.coordinates}
                  zoom={17}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={false}
                  className="rounded-t-lg"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker 
                    position={facility.coordinates}
                    icon={L.icon({
                      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34]
                    })}
                  >
                    <Popup>{facility.name}</Popup>
                  </Marker>
                </MapContainer>
              </div>
              <div className="p-4" style={{ fontFamily: "NotoSansSinhala" }}>
                <h4 className="text-lg font-bold mb-2">{facility.name}</h4>
                <p className="text-gray-700 mb-2">{facility.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-amber-600">වේලාව: {facility.hours}</span>
                </div>
                <button 
                  onClick={() => openInGoogleMaps(facility.coordinates)}
                  className="mt-3 w-full bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  පිහිටීම බලන්න
                </button>
              </div>
            </div>
          ))}
        </AnimationSequence>
      </div>)}
    </div>
  );
}

export default SanitaryFacilities;