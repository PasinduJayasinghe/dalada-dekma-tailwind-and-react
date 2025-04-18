import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Announcements from "./category/Announcements";
import ImportantLocations from "./category/ImportantLocations";
import Police from "./category/Security";
import FreeFood from "./category/FreeFood";
import SanitaryFacilities from "./category/SanitaryFacilities";
import MedicalServices from "./category/MedicalServices";
import LostAndFound from "./category/LostAndFound";
import VehicleInfo from "./category/VehicleInfo";
import WaterDistribution from "./category/WaterDistribution";
import FAQ from "./category/FAQ";
import WeatherReports from "./category/WeatherReports";
import InfoCenter from "./category/InfoCenter";
import Background from "../assets/images/daladamaligawa5.png";
import Map from "../assets/images/all locations.png"
import { FaTrafficLight, FaBullhorn, FaMapMarkerAlt, FaUtensils, FaToilet, FaMedkit, FaSearch, FaCar, FaHandHoldingWater, FaCloudSun, FaInfoCircle, FaQuestion, FaFacebook, FaYoutube, FaGlobe, FaSync } from "react-icons/fa";

function CategoryContainer() {
  const categories = [
    {
      id: "announcements",
      title: "වැදගත් තොරතුරු",
      title_fon: "jeo.;a f;dr;=re",
      description: "Important announcements",
      component: Announcements,
      icon: FaBullhorn
    },
    {
      id: "locations",
      title: "වැදගත් ස්ථාන",
      title_fon: "jeo.;a ia:dk",
      description: "Important locations",
      component: ImportantLocations,
      icon: FaMapMarkerAlt
    },{
      id: "police",
      title: "ආරක්ෂක නිවේදන",
      title_fon: "wdrlaIl ksfõok",
      description: "Security Messages",
      component: Police, 
      icon: FaTrafficLight
    },
    {
      id: "freefood",
      title: "දන්සැල්",
      title_fon: "okaie,a",
      description: "Food donations",
      component: FreeFood,
      icon: FaUtensils
    },
    {
      id: "sanitary",
      title: "සනීපාරක්ෂක සේවා",
      title_fon: "ikSmdrlaIl fiajd",
      description: "Sanitary services",
      component: SanitaryFacilities,
      icon: FaToilet
    },
    {
      id: "medical",
      title: "වෛද්‍ය සේවා",
      title_fon: "ffjoH fiajd",
      description: "Emergency medical services",
      component: MedicalServices,
      icon: FaMedkit
    },
    {
      id: "lostfound",
      title: "අතරමන් වූවන් සොයා ගැනීම",
      title_fon: "w;ruka jQjka fidhd .ekSu",
      description: "Lost & Found",
      component: LostAndFound,
      icon: FaSearch
    },
    {
      id: "vehicles",
      title: "වාහන නතර කිරීම්",
      title_fon: "jdyk k;r lsÍï",
      description: "Vehicle Parking",
      component: VehicleInfo,
      icon: FaCar
    },
    {
      id: "water",
      title: "පානීය ජලය",
      title_fon: "mdkSh c,h",
      description: "Drinking water",
      component: WaterDistribution,
      icon: FaHandHoldingWater
    },
    {
      id: "faq",
      title: "නිතර අසන පැනපැන",
      title_fon: "ks;r wik mek",
      description: "FAQ",
      component: FAQ,
      icon: FaQuestion
    },
    {
      id: "weather",
      title: "කාලගුණය",
      title_fon: "ld,.=Kh",
      description: "Weather",
      component: WeatherReports,
      icon: FaCloudSun
    },
    {
      id: "infocenter",
      title: "තොරතුරු මධ්‍යස්ථානය",
      title_fon: "f;dr;=re uOHia:dkh",
      description: "Information center",
      component: InfoCenter,
      icon: FaInfoCircle
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeUntilNextRefresh, setTimeUntilNextRefresh] = useState(600); // 10 minutes in seconds

  const handleBack = () => {
    setSelectedCategory(null);
    // Add a new entry to the history stack when a category is selected
    // This ensures the back button works as expected
    window.history.pushState({ hasSelectedCategory: false }, '');
  };


  // Function to refresh data
  const refreshData = async () => {
    setIsRefreshing(true);
    
    try {
      // Here you would typically call your data fetching functions
      // For example, if each category component has a refresh method:
      if (selectedCategory) {
        // Example: If component has a refresh method
        // await categoryComponents[selectedCategory].refresh();
        console.log(`Refreshing data for ${selectedCategory}...`);
      } else {
        // Refresh all categories when on the main screen
        console.log("Refreshing data for all categories...");
        // Example: categories.forEach(cat => cat.component.refresh());
      }
      
      setLastRefresh(new Date());
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Auto-refresh every 10 minutes
  useEffect(() => {
    const refreshInterval = 10 * 60 * 1000; // 10 minutes in milliseconds
    
    // Set up the countdown timer
    const countdownInterval = setInterval(() => {
      setTimeUntilNextRefresh(prev => {
        if (prev <= 1) {
          return 600; // Reset to 10 minutes
        }
        return prev - 1;
      });
    }, 1000);
    
    // Set up the refresh timer
    const refreshTimer = setInterval(() => {
      refreshData();
    }, refreshInterval);
    
    // Initial data fetch
    refreshData();
    
    // Clean up intervals on component unmount
    return () => {
      clearInterval(refreshTimer);
      clearInterval(countdownInterval);
    };
  }, []);  // Empty dependency array means this runs once on mount

  // Set up popstate listener for browser/mobile back button
  useEffect(() => {
    const handlePopState = (event) => {
      // Check if we're going back from a selected category
      if (selectedCategory && (!event.state || !event.state.hasSelectedCategory)) {
        setSelectedCategory(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedCategory]);

  // When a category is selected, update history
  useEffect(() => {
    if (selectedCategory) {
      window.history.pushState({ hasSelectedCategory: true }, '');
    }
  }, [selectedCategory]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }, [selectedCategory]);



  // New mobile navigation logic
  useEffect(() => {
    // Handle the browser's back button/gesture
    const handlePopState = (event) => {
      if (event.state && event.state.view === 'main') {
        setSelectedCategory(null);
      }
    };
        // Add event listener
        window.addEventListener('popstate', handlePopState);
    
        // Clean up
        return () => {
          window.removeEventListener('popstate', handlePopState);
        };
      }, []);

    // Modify your existing handleTileClick function
    const handleTileClick = (categoryId) => {
      // If we're selecting a category (not toggling the same one off)
      if (categoryId !== selectedCategory) {
        // Push the main page state to history before navigating to category
        window.history.pushState(
          { view: 'main' }, 
          '', 
          window.location.pathname
        );
        
        // Update state to show the selected category
        setSelectedCategory(categoryId);
      } else {
        setSelectedCategory(null);
      }
    };

  // Format time until next refresh
  const formatTimeRemaining = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Manual refresh handler
  const handleManualRefresh = () => {
    refreshData();
    setTimeUntilNextRefresh(600); // Reset timer to 10 minutes
  };

  return (
    <div className="cursor-default p-4 bg-cover bg-center min-h-screen flex flex-col" 
      style={{ 
        backgroundImage: `linear-gradient(rgba(200, 200, 255, 0.7), rgba(200, 200, 8, 0.5)), url(${Background})`
      }}
    >
      {/* Refresh status bar (Hidden for a reason) */}
      <div className="hidden mb-4 bg-[#220901]/90 text-[#F6AA1C] px-4 py-2 rounded-lg shadow flex justify-between items-center border-2 border-[#941B0C]">
        <div className="flex items-center">
          <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
          <div className="ml-6 text-sm">
            Next update in: {formatTimeRemaining(timeUntilNextRefresh)}
          </div>
        </div>
        <button 
          onClick={handleManualRefresh}
          disabled={isRefreshing}
          className={`flex items-center bg-[#BC3908] hover:bg-[#F6AA1C] text-[#F6AA1C] hover:text-[#220901] px-3 py-1 rounded ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <FaSync className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Now'}
        </button>
      </div>

      {/* Show tiles when no category is selected */}
      {!selectedCategory && (
        <div className="flex flex-col gap-6 justify-center items-center">
          <div className={`grid gap-6 ${isMobile ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}>
              {categories.map(category => {
                const isFontAwesomeIcon = typeof category.icon === 'object' && category.icon.iconName;
                return (
                  <div 
                    key={category.id}
                    onClick={() => handleTileClick(category.id)}
                    className="grid sm:grid-cols-1 bg-[#621708]/90 hover:bg-[#F6AA1C] h-56 text-white hover:text-[#220901] p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-[#941B0C] flex flex-col justify-center items-center text-center"
                  >
                    <div className="flex justify-center items-center mb-3">
                        {isFontAwesomeIcon ? (
                          <FontAwesomeIcon icon={category.icon} size="2x" />
                        ) : (
                          <category.icon size={56} />
                        )}
                    </div>
                    <div className="flex flex-col justify-center items-center text-center">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-1" style={{ fontFamily: "FMBindumathi"}}>{category.title_fon}</h2>
                      <p className="text-sm sm:text-md md:text-lg mb-4 font-extralight">{category.description}</p>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Additional divs for contact and radio player */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:w-3/4 mx-auto mt-6">
            {/* Contact Details Div */}
            <div className="bg-[#220901]/90 h-auto p-6 rounded-lg shadow-lg border-2 border-[#941B0C] text-[#F6AA1C]">
              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ fontFamily: "NotoSansSinhala" }}>
                ක්ෂණික ඇමතුම්
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4 text-sm sm:text-md" style={{ fontFamily: "NotoSansSinhala" }}>
                  {/* Police Section */}
                  <div>
                    <h5 className="font-semibold mb-2 text-[#F6AA1C]">🚨 පොලිස්:</h5>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start">
                        <span className="mr-2 mt-1 font-extrabold">~</span>
                        <div>
                          <span>හදිසි අංකය</span>
                          <div className="font-bold">119</div>
                        </div>
                      </li>
                      <li className="flex items-start">
                      <span className="mr-2 mt-1 font-extrabold">~</span>
                        <div>
                          <span>දළදා මාලිගා පොලිසිය</span>
                          <div className="font-bold">0812 225 722</div>
                        </div>
                      </li>
                      <li className="flex items-start">
                      <span className="mr-2 mt-1 font-extrabold">~</span>
                        <div>
                          <span>මහනුවර පොලිසිය</span>
                          <div className="font-bold">0812 222 222</div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Fire Department */}
                  <div>
                    <h5 className="font-semibold mb-2 text-[#F6AA1C]">🚒 ගිනි නිවීම්:</h5>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start">
                      <span className="mr-2 mt-1 font-extrabold">~</span>
                        <div>
                          <span>හදිසි අංකය</span>
                          <div className="font-bold">110</div>
                        </div>
                      </li>
                      <li className="flex items-start">
                      <span className="mr-2 mt-1 font-extrabold">~</span>
                        <div>
                          <span>මහනුවර ගිනි නිවීම් දෙපාර්තමේන්තුව</span>
                          <div className="font-bold">0812 204 844</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4 text-sm sm:text-md" style={{ fontFamily: "NotoSansSinhala" }}>
                  {/* Ambulance */}
                  <div>
                    <h5 className="font-semibold mb-2 text-[#F6AA1C]">🚑 ගිලන් රථ:</h5>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start">
                      <span className="mr-2 mt-1 font-extrabold">~</span>
                        <div>
                          <span>හදිසි අංකය</span>
                          <div className="font-bold">1990</div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Municipal Council */}
                  <div>
                    <h5 className="font-semibold mb-2 text-[#F6AA1C]">🏛️ මහනුවර මහ නගර සභාව:</h5>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start">
                      <span className="mr-2 font-extrabold">~</span>
                        <div>
                          <div className="font-bold">0812 222 275</div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Train Station */}
                  <div>
                    <h5 className="font-semibold mb-2 text-[#F6AA1C]">🚂 මහනුවර දුම්රිය ස්ථානය:</h5>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start">
                      <span className="mr-2 font-extrabold">~</span>
                        <div>
                          <div className="font-bold">0812 222 271</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-6 pt-4 border-t grid grid-cols-1 sm:grid-cols-2 border-[#941B0C]">
                <h4 className="text-xl font-bold mb-3" style={{ fontFamily: "NotoSansSinhala" }}>අපව සොයාගන්න</h4>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a 
                    href="https://www.facebook.com/sridaladamaligawa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center bg-[#3b5998] hover:bg-[#334d84] text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaFacebook />
                  </a>
                  
                  <a 
                    href="https://www.youtube.com/@sridalada" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center bg-[#ff0000] hover:bg-[#cc0000] text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaYoutube />
                  </a>
                  
                  <a 
                    href="https://sridaladamaligawa.lk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center bg-[#941B0C] hover:bg-[#7a160a] text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaGlobe />
                  </a>
                </div>
              </div>
            </div>
            <div className="group relative h-auto overflow-hidden rounded-lg shadow-lg border-2 border-[#941B0C] hover:border-[#F6AA1C] transition-all duration-300">
              <a
                href={Map}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <img 
                  src={Map} 
                  alt="පොදු පහසුකම් සිතියම"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#220901]/90 to-transparent flex items-end p-4 pointer-events-none">
                  <p 
                    className="text-[#F6AA1C] font-bold text-lg"
                    style={{ fontFamily: "NotoSansSinhala" }}
                  >
                    පොදු පහසුකම් සිතියම
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Show selected category content */}
      {selectedCategory && (
        <div>
          {/* Back button - shows on both mobile and desktop */}
          <button
            onClick={handleBack}
            className="mb-4 px-4 py-2 bg-[#BC3908] hover:bg-[#F6AA1C] text-[#F6AA1C] hover:text-[#220901] rounded-md flex items-center transition-all border-2 border-[#941B0C]"
          >
            <span className="mr-2">←</span> Back to categories
          </button>
          
          {/* Content container */}
          <div className="p-4 rounded-lg shadow-lg">
            {(() => {
              const category = categories.find(c => c.id === selectedCategory);
              const CategoryComponent = category?.component;
              return CategoryComponent ? <CategoryComponent /> : null;
            })()}
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryContainer;