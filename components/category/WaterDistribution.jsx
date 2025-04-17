import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Grid from "../Grid";
import AnimationSequence from "../Animation/AnimationSequence";

function WaterDistribution() {
  const [announcements, setAnnouncements] = useState([]);
  const [waterPoints, setWaterPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("announcements"); // 'announcements' or 'locations'

  // Fetch water distribution points
  useEffect(() => {
    const fetchWaterPoints = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/locations/category/10');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setWaterPoints(data);
      } catch (err) {
        setError(`Failed to load water points: ${err.message}`);
      }
    };

    fetchWaterPoints();
  }, []);

  // Fetch water distribution announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notices/category/9');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const sortedData = data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
        setAnnouncements(sortedData);
        setError(null);
      } catch (err) {
        setError(`Failed to load announcements: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchAnnouncements();
      const interval = setInterval(fetchAnnouncements, 300000); // Refresh every 5 minutes
      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const openInGoogleMaps = (coordinates) => {
    const [lat, lng] = coordinates;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-300"></div>
        <span className="ml-4">Loading water distribution information...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-4xl font-semibold mb-4 border-b pb-2 border-amber-300 text-center" style={{ fontFamily: "FMBindumathi"}}>
        {'mdkSh c, fnodyeÍu'}
        {/* පානීය ජල බෙදාහැරීම */}
      </h2>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'announcements' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('announcements')}
          style={{ fontFamily: "NotoSansSinhala" }}
        >
          නිවේදන
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'locations' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('locations')}
          style={{ fontFamily: "NotoSansSinhala" }}
        >
          ජල බෙදාහැරීමේ ස්ථාන
        </button>
      </div>

      {/* Announcements Tab */}
      {activeTab === 'announcements' && (
        <>
          {announcements.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No water distribution announcements available.
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
                {announcements.map((announcement) => (
                  <Grid key={announcement.id}>
                    <div style={{ fontFamily: "NotoSansSinhala" }}>
                      <h3 className="text-lg font-bold mb-2">{announcement.title}</h3>
                      <p className="whitespace-pre-line">{announcement.content}</p>
                      {announcement.createdDate && (
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(announcement.formattedDate).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </Grid>
                ))}
              </AnimationSequence>
            </div>
          )}
        </>
      )}

      {/* Locations Tab */}
      {activeTab === 'locations' && (
        <>
          {waterPoints.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No water distribution points available.
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
                {waterPoints.map((point) => (
                  <div 
                    key={point.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48">
                      <MapContainer
                        center={point.coordinates || [7.2906, 80.6337]}
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
                          position={point.coordinates}
                          icon={L.icon({
                            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34]
                          })}
                        >
                          <Popup>{point.name}</Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                    <div className="p-4" style={{ fontFamily: "NotoSansSinhala" }}>
                      <h4 className="text-lg font-bold mb-2">{point.name}</h4>
                      <p className="text-gray-700 mb-2">{point.description}</p>
                      <div className="flex justify-between text-sm">
                        {point.hours && (
                          <span className="font-medium text-amber-600">වේලාව: {point.hours}</span>
                        )}
                        {point.contact && (
                          <span className="font-medium text-amber-600">දුරකථන: {point.contact}</span>
                        )}
                      </div>
                      <button 
                        onClick={() => openInGoogleMaps(point.coordinates)}
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
        </>
      )}
    </div>
  );
}

export default WaterDistribution;