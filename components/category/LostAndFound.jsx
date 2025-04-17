import React, { useState, useEffect } from "react";
import AnimationSequence from "../Animation/AnimationSequence";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Grid from "../Grid"

function LostAndFound() {
  const [notices, setNotices] = useState([]);
  const [findingPoints, setFindingPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("notices"); // 'notices' or 'guide' or 'locations'

  // Guide steps
  const GUIDE_STEPS = [
    "අතරමන් වූ පුද්ගලයාගේ ඡායාරූපයක් සහ විස්තර ගන්න",
    "ආසන්නතම ආරක්ෂක කාර්යාලයට වාර්තා කරන්න",
    "පොලිස් ස්ථානයට දන්වන්න (ඇමතුම: 119)",
    "ස්ථානික රෝහල්වල සෝදිසි කරන්න",
    "සමාජ මාධ්‍ය හරහා තොරතුරු පැතිරවීමට උත්සාහ කරන්න",
    "අතරමන් වූ පුද්ගලයාගේ අන්තිම වරට දක්නට ලැබූ ස්ථානය අවට සොයන්න"
  ];

  useEffect(() => {
    let loadingTimer;
    let fetchInterval;

    const fetchData = async () => {
      try {
        // Fetch notices (lost persons) from category 7
        const noticesResponse = await fetch('http://localhost:5000/api/notices/category/7');
        if (!noticesResponse.ok) throw new Error("Failed to fetch notices");
        const noticesData = await noticesResponse.json();
        
        // Fetch finding points (locations category 7)
        const pointsResponse = await fetch('http://localhost:5000/api/locations/category/7');
        if (!pointsResponse.ok) throw new Error("Failed to fetch finding points");
        const pointsData = await pointsResponse.json();
        
        setNotices(noticesData.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)));
        setFindingPoints(pointsData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadingTimer = setTimeout(() => {
      fetchData();
      fetchInterval = setInterval(fetchData, 30000);
    }, 1000);

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
        <span className="ml-4">Loading information...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading information: {error}
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-4xl font-semibold mb-4 border-b pb-2 border-amber-300 text-center" style={{ fontFamily: "FMBindumathi"}}>
        {'w;ruka jQjka fidhd .ekSu'}
        {/* අතරමන් වූවන් සොයා ගැනීම */}
      </h2>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'notices' ? 'text-amber-600 border-b-2 border-amber-500 font-extrabold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('notices')}
        >
          අතරමන් වූ දෑ
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'guide' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('guide')}
        >
          සොයා ගැනීමේ මගපෙන්වීම
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'locations' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('locations')}
        >
          අතරමන් වූ පුද්ගලයන්
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'notices' && (
        <>
          {notices.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No lost person notices available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimationSequence 
                direction="right" 
                baseDelay={100} 
                staggerDelay={150} 
                duration={800} 
                distance={30} 
                easing="ease-out"
                className="contents"
              >
                {notices.map((notice) => (
                  <Grid key={notice.id} timestamp={notice.formattedDate}>
                    <div style={{ fontFamily: "NotoSansSinhala" }}>
                      <h3 className="text-lg font-bold">{notice.title}</h3>
                      <p className="mb-2">{notice.content}</p>
                    </div>
                  </Grid>
                ))}
              </AnimationSequence>
            </div>
          )}
        </>
      )}

      {activeTab === 'guide' && (
        <div className="bg-amber-50 rounded-lg p-6" style={{ fontFamily: "NotoSansSinhala" }}>
          <h3 className="text-2xl font-bold mb-4 text-amber-800">අතරමන් වූ පුද්ගලයකු සොයා ගැනීමේ මගපෙන්වීම</h3>
          <ol className="space-y-4 list-decimal list-inside">
            {GUIDE_STEPS.map((step, index) => (
              <li key={index} className="text-gray-800">
                {step}
              </li>
            ))}
          </ol>
          <div className="mt-6 p-4 bg-white rounded-lg border border-amber-200">
            <h4 className="font-bold text-amber-700 mb-2">අවධානයට:</h4>
            <p>අතරමන් වූ දරුවන් සඳහා විශේෂ අවධානයක් යොමු කරන්න. ඔවුන්ගේ ඡායාරූප, ඇඳුම් සහ විශේෂ සලකුණු පිළිබඳ විස්තර ඉක්මනින් බෙදාහරින්න.</p>
          </div>
        </div>
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
            {findingPoints.map(location => (
              <div key={location.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                {/* Status Badge - Added here */}
                {location.status && (
                  <div className={`px-3 py-1 ${location.status === 'Found' ? 
                    'bg-green-100 text-green-800 border-b border-green-200' : 
                    'bg-red-100 text-red-800 border-b border-red-200'}`}
                  >
                    <div className="flex items-center justify-center">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${location.status === 'Found' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-sm font-medium">
                        {location.status === 'Found' ? 'සොයාගෙන ඇත' : 'සොයාගෙන නැත'}
                      </span>
                    </div>
                  </div>
                )}
                
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
                  
                  {/* Added Status Details */}
                  {location.status === 'Found' && location.found_time && (
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-semibold">සොයාගත් දිනය: </span>
                      {new Date(location.found_time).toLocaleDateString()}
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-amber-600">වේලාව: {location.hours}</span>
                    <span className="font-medium text-amber-600">දුරකථන: {location.contact}</span>
                  </div>
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

export default LostAndFound;