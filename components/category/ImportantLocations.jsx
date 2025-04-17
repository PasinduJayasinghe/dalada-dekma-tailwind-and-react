import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import AnimationSequence from "../Animation/AnimationSequence";
import L from "leaflet";
import walespark from "../../assets/images/route1.png"
import rathubokkuwa from "../../assets/images/route2.png"
import dssenanayake from "../../assets/images/route3.png"

const DEFAULT_CENTER = [7.2906, 80.6337];

function ImportantLocations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Static images data
  const staticImages = [
    {
      id: 1,
      src: walespark,
      alt: "Route 1",
      caption: "වේල්ස් පාර්ක් හන්දිය හරහා මාර්ගය"
    },
    {
      id: 2,
      src: rathubokkuwa,
      alt: "Route 2",
      caption: "රතුබොක්කුව හන්දිය හරහා මාර්ගය"
    },
    {
      id: 3,
      src: dssenanayake,
      alt: "Route 3",
      caption: "ඩී.එස් සේනානායක විදිය හරහා මාර්ගය"
    }
  ];

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/locations');
        if (!response.ok) {
          throw new Error("Failed to load locations");
        }
        const data = await response.json();
        
        // Transform and filter the data
        const transformedData = data
          // Filter out category_id 7 (Lost & Found)
          .filter(location => location.category_id !== 7)
          // Transform remaining locations
          .map(location => ({
            ...location,
            coordinates: [parseFloat(location.lat), parseFloat(location.lng)]
          }));
        
        setLocations(transformedData);
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

  const openInGoogleMaps = (coordinates) => {
    if (!Array.isArray(coordinates) || coordinates.length !== 2) return;
    const [lat, lng] = coordinates;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(googleMapsUrl, '_blank');
  };
  
  if (loading) {
    return (
      <div className="space-y-8"> {/* Added container for both gallery and spinner */}
        {/* Static Images Gallery - Now properly rendered */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {staticImages.map((image) => (
            <div 
              key={image.id} 
              className="group relative overflow-hidden rounded-lg shadow-lg border-2 border-[#941B0C] hover:border-[#F6AA1C] transition-all duration-300"
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#220901]/90 to-transparent flex items-end p-4">
                <p 
                  className="text-[#F6AA1C] font-bold text-lg"
                  style={{ fontFamily: "NotoSansSinhala" }}
                >
                  {image.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Loading Spinner */}
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-300"></div>
          <span className="ml-4 text-[#F6AA1C]">Loading locations...</span>
        </div>
      </div>
    );
  }

  const StaticImageGallery = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {staticImages.map((image) => (
        <div 
          key={image.id} 
          className="group relative overflow-hidden rounded-lg shadow-lg border-2 border-[#941B0C] hover:border-[#F6AA1C] transition-all duration-300"
        >
          <a
            href={image.src}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <img 
              src={image.src} 
              alt={image.alt}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#220901]/90 to-transparent flex items-end p-4 pointer-events-none">
              <p 
                className="text-[#F6AA1C] font-bold text-lg"
                style={{ fontFamily: "NotoSansSinhala" }}
              >
                {image.caption}
              </p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
  

  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (locations.length === 0) return <div className="text-center py-8">No locations found</div>;

  return (
    <div className="px-4 py-6">
      <h2 className="text-4xl font-bold text-center mb-6 pb-2 border-b border-amber-300" style={{ fontFamily: "FMBindumathi"}}>
        {'jeo.;a ia:dk'}
        {/* වැදගත් ස්ථාන */}
      </h2>

      {/* Static Image Gallery - Always Visible */}
      <StaticImageGallery />
      
      {/* Conditional Content */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-300"></div>
          <span className="ml-4 text-[#F6AA1C]">Loading locations...</span>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">
          {error} - Showing static content only
        </div>
      ) : locations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No locations found - Showing static content only
        </div>
      ) : (
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
              <LocationCard 
                key={location.id} 
                location={location} 
                onNavigate={openInGoogleMaps}
              />
            ))}
          </AnimationSequence>
        </div>
      )}
    </div>
  );
}

const LocationCard = ({ location, onNavigate }) => {
  // Ensure coordinates exist and are valid numbers
  const coordinates = Array.isArray(location.coordinates) && 
                      location.coordinates.length === 2 &&
                      !isNaN(location.coordinates[0]) && 
                      !isNaN(location.coordinates[1])
    ? location.coordinates
    : DEFAULT_CENTER;

  return (
    <div 
      className="bg-[#f6aa1c] bg-opacity-10 p-4 rounded-lg shadow-lg border border-[#220901] border-opacity-20 transition-all hover:shadow-xl hover:scale-[1.01] cursor-pointer"
      onClick={() => onNavigate(coordinates)}
    >
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
          {location.name || "Unknown Location"}
        </h3>
      </div>
      
      <div className="h-40 w-full mt-3 rounded-lg overflow-hidden border-2 border-[#621708] border-opacity-30">
        <MapContainer
          center={coordinates}
          zoom={16}
          style={{ 
            height: "100%", 
            width: "100%",
            filter: 'sepia(20%) saturate(120%)'
          }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker 
            position={coordinates}
            icon={new L.Icon({
              iconUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23BC3908"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
              iconSize: [32, 32],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32]
            })}
          >
            <Popup className="font-bold text-[#621708]">
              {location.name || "Unknown Location"}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      
      <div className="flex justify-between items-center mt-3">
        <div className="flex justify-between text-xs flex-1">
          <span className="text-[#220901] opacity-70">
            Lat: {coordinates[0].toFixed(4)}
          </span>
          <span className="text-[#220901] opacity-70">
            Lng: {coordinates[1].toFixed(4)}
          </span>
        </div>
        <div className="ml-2 flex items-center bg-[#BC3908] hover:bg-[#941B0C] transition-colors text-white px-2 py-1 rounded text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Navigate
        </div>
      </div>
    </div>
  );
};

export default ImportantLocations;