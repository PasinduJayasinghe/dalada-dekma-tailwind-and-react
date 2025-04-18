import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import AnimationSequence from "../Animation/AnimationSequence";
import Grid from "../Grid";

function MedicalServices() {
  const [activeTab, setActiveTab] = useState("services");
  const [medicalLocations, setMedicalLocations] = useState([]);
  const [medicalServices, setMedicalServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch medical locations
  useEffect(() => {
    let loadingTimer;
    let fetchInterval;

    const fetchMedicalLocations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/locations/category/6');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Ensure coordinates are properly formatted
        const formattedData = data.map(location => ({
          ...location,
          coordinates: Array.isArray(location.coordinates) 
            ? location.coordinates 
            : [parseFloat(location.lat), parseFloat(location.lng)]
        }));
        setMedicalLocations(formattedData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadingTimer = setTimeout(() => {
      fetchMedicalLocations();
      fetchInterval = setInterval(fetchMedicalLocations, 300000);
    }, 500);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(fetchInterval);
    };
  }, []);

  // Fetch medical services
  useEffect(() => {
    let loadingTimer;
    let fetchInterval;
  
    const fetchMedicalServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notices/category/6');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const sortedData = data.sort((a, b) =>
          new Date(b.createdDate) - new Date(a.createdDate)
        );
        setMedicalServices(sortedData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    loadingTimer = setTimeout(() => {
      fetchMedicalServices();
      fetchInterval = setInterval(fetchMedicalServices, 300000);
    }, 500);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(fetchInterval);
    }
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
        <span className="ml-4">Loading medical services...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading medical services: {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl lg:text-4xl font-semibold mb-4 border-b pb-2 border-amber-300 text-center" style={{ fontFamily: "FMBindumathi"}}>
        {'yosis ffjoH fiajd'}
      </h2>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-6 text-sm lg:text-lg">
        <button
          className={`py-2 px-4 font-extrabold ${activeTab === 'services' ? 'text-amber-900 border-b-2 border-amber-800' : 'text-gray-700'}`}
          onClick={() => setActiveTab('services')}
          style={{ fontFamily: "NotoSansSinhala" }}
        >
          වෛද්‍ය සේවා
        </button>
        <button
          className={`py-2 px-4 font-extrabold ${activeTab === 'locations' ? 'text-amber-800 border-b-2 border-amber-800' : 'text-gray-700'}`}
          onClick={() => setActiveTab('locations')}
          style={{ fontFamily: "NotoSansSinhala" }}
        >
          ස්ථාන සිතියම්
        </button>
      </div>
          {/* Embedded Google My Map */}
          <div className="mb-8 rounded-lg flex justify-center overflow-hidden shadow-lg border-[#BC3908]">
          <iframe className="border-2 border-[#BC3908] rounded-lg" src="https://www.google.com/maps/d/u/0/embed?mid=1L5PYC-Hgtr9ScNLwdMXC70pGvS155nI&ehbc=2E312F&noprof=1" width="100%" height="720"></iframe>
      </div>
      {/* Tab Content */}
      {activeTab === 'services' && (
        <>
          {medicalServices.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No medical services available at the moment.
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
                {medicalServices.map((service) => (
                  <Grid key={service.id} timestamp={service.formattedDate}>
                    <div style={{ fontFamily: "NotoSansSinhala" }}>
                      <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                      <p className="whitespace-pre-line">{service.content}</p>
                    </div>
                  </Grid>
                ))}
              </AnimationSequence>
            </div>
          )}
        </>
      )}

      {activeTab === 'locations' && (
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
            {medicalLocations.map(location => (
              <div 
                key={location.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="h-48 w-full"> {/* Added w-full here */}
                  <MapContainer
                    center={location.coordinates}
                    zoom={16}
                    style={{ height: "100%", width: "100%" }}
                    scrollWheelZoom={false}
                    className="rounded-t-lg" // Added z-0 to fix z-index issues
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
          </AnimationSequence>
        </div>
      )}
    </div>
  );
}

export default MedicalServices;