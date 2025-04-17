import React, { useState, useEffect } from "react";
import Grid from "../Grid";
import AnimationSequence from "../Animation/AnimationSequence";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function VehicleInfo() {
  const [vehicleInfo, setVehicleInfo] = useState([]);
  const [parkingLocations, setParkingLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Update the useEffect hook to fetch from API instead of using dummy data
useEffect(() => {
  let loadingTimer;
  let fetchInterval;

  const fetchParkingLocations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/locations/category/8'); // Category 8 for parking
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setParkingLocations(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  loadingTimer = setTimeout(() => {
    fetchParkingLocations();
    fetchInterval = setInterval(fetchParkingLocations, 300000); // Refresh every 5 minutes
  }, 500);

  return () => {
    clearTimeout(loadingTimer);
    clearInterval(fetchInterval);
  };
}, []);

  const DEFAULT_CENTER = [7.2906, 80.6337];

  useEffect(() => {
    let loadingTimer;
    let fetchInterval;

    const fetchVehicleInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notices/category/8');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const sortedData = data.sort((a, b) =>
          new Date(b.createdDate) - new Date(a.createdDate)
        );
        setVehicleInfo(sortedData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadingTimer = setTimeout(() => {
      fetchVehicleInfo();
      fetchInterval = setInterval(fetchVehicleInfo, 300000);
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
        <span className="ml-4">Loading vehicle information...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading vehicle information: {error}
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-4xl font-semibold mb-4 border-b pb-2 border-amber-300 text-center" style={{ fontFamily: "FMBindumathi"}}>
        {'jdyk k;r lsÍï yd m%jdyk fiajd'}
        {/* වාහන නතර කිරීම් / ප්‍රවාහන සේවාසේවා */}
      </h2>
      
      {/* Parking Locations Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4 text-center" style={{ fontFamily: "NotoSansSinhala" }}>
          වාහන නැවැත්වීම් ස්ථාන
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parkingLocations.map(location => (
            <div 
              key={location.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="h-48">
                <MapContainer
                  center={location.coordinates}
                  zoom={16}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={false}
                  className="rounded-t-lg"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker 
                    position={location.coordinates}
                    icon={L.icon({
                      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34]
                    })}
                  >
                    <Popup>{location.name}</Popup>
                  </Marker>
                </MapContainer>
              </div>
              <div className="p-4" style={{ fontFamily: "NotoSansSinhala" }}>
                <h4 className="text-lg font-bold mb-2">{location.name}</h4>
                <p className="text-gray-700 mb-2">{location.description}</p>
                <p className="text-sm font-medium text-amber-600">{location.capacity}</p>
                <button 
                  onClick={() => openInGoogleMaps(location.coordinates)}
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
        </div>
      </div>

      {/* Vehicle Information Section */}
      {vehicleInfo.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No vehicle information available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimationSequence 
            direction="right" 
            baseDelay={100} 
            staggerDelay={150} 
            duration={800} 
            distance={30} 
            easing="ease-out"
            className="contents"
          >
            {vehicleInfo.map((info) => (
              <Grid key={info.id} timestamp={info.formatedDate}>
                <div style={{ fontFamily: "NotoSansSinhala" }}>
                  <h3 className="text-lg font-bold mb-2">{info.title}</h3>
                  <p className="whitespace-pre-line">{info.content}</p>
                </div>
              </Grid>
            ))}
          </AnimationSequence>
        </div>
      )}
    </div>
  );
}

export default VehicleInfo;