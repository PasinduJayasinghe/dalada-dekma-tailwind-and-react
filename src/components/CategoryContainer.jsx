import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Announcements from "./category/announcements";
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
import { FaTrafficLight, FaBullhorn, FaMapMarkerAlt, FaUtensils, FaToilet, FaMedkit, FaSearch, FaCar, FaFire, FaWater, FaCloudSun, FaInfoCircle, FaQuestion } from "react-icons/fa";
import AnimationSequence from "./Animation/AnimationSequence";

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
      description: "Danzal Zone",
      component: FreeFood,
      icon: FaUtensils
    },
    {
      id: "sanitary",
      title: "සනීපාරක්ෂක",
      title_fon: "ikSmdrlaIl",
      description: "Sanitary",
      component: SanitaryFacilities,
      icon: FaToilet
    },
    {
      id: "medical",
      title: "හදිසි වෛද්‍ය සේවා හා කදවුරු",
      title_fon: "yosis ffjoH fiajd",
      description: "Emergency medical services & Camps",
      component: MedicalServices,
      icon: FaMedkit
    },
    {
      id: "lostfound",
      title: "අතරමන් වූවන් සොයා ගැනීම",
      title_fon: "w;ruka jQjka fidhd .ekSu",
      description: "Find Lost Person",
      component: LostAndFound,
      icon: FaSearch
    },
    {
      id: "vehicles",
      title: "වාහන නතර කිරීම් / ප්‍රවාහන සේවාසේවා",
      title_fon: "jdyk k;r lsÍï yd m%jdyk fiajd",
      description: "Vehicle Parking & Transport",
      component: VehicleInfo,
      icon: FaCar
    },
    {
      id: "water",
      title: "පානීය ජල බෙදාහැරීම",
      title_fon: "mdkSh c, fnodyeÍu",
      description: "Drinking water distribution",
      component: WaterDistribution,
      icon: FaWater
    },
    {
      id: "faq",
      title: "නිතර අසන පැනපැන",
      title_fon: "ks;r wik mek",
      description: "Frequently Asked Questions",
      component: FAQ,
      icon: FaQuestion
    },
    {
      id: "weather",
      title: "කාලගුන වාර්තා",
      title_fon: "ld,.=k jd¾;d",
      description: "Weather reports",
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

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleTileClick = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const handleDropdownSelect = (categoryId) => {
    setSelectedCategory(categoryId === "all" ? null : categoryId);
  };

  return (
    <div className="cursor-default p-4 bg-cover bg-center min-h-screen flex flex-col" 
      style={{ 
        backgroundImage: `linear-gradient(rgba(34, 9, 1, 0.7), rgba(98, 23, 8, 0.5)), url(${Background})`
      }}
    >
      {/* Mobile dropdown - always visible on mobile */}
      {isMobile && (
        <div className="mb-4">
          <select
            onChange={(e) => handleDropdownSelect(e.target.value)}
            value={selectedCategory || "all"}
            className="w-full p-2 border border-[#BC3908] rounded-md bg-[#220901] text-[#F6AA1C]"
          >
            <option value="all">සියල්ල</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
      )}
  
      {/* Show tiles when no category is selected */}
      {!selectedCategory && (
        <div className="flex flex-col gap-6">
          <div className={`grid gap-6 ${isMobile ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}>
            <AnimationSequence 
              direction="right" 
              baseDelay={100} 
              staggerDelay={100} 
              duration={800} 
              distance={30} 
              easing="ease-out"
              className="contents"
            >
              {categories.map(category => {
                const isFontAwesomeIcon = typeof category.icon === 'object' && category.icon.iconName;
                return (
                  <div 
                    key={category.id}
                    onClick={() => handleTileClick(category.id)}
                    className="grid sm:grid-cols-2 bg-[#621708]/90 hover:bg-[#F6AA1C] h-56 text-[#F6AA1C] hover:text-[#220901] pr-0 p-2 sm:pr-4 sm:p-0 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-[#941B0C]"
                  >
                    <div className="flex justify-center items-center">
                      <div className="p-3 bg-[#220901] rounded-full w-28 md:w-24 sm:w-20 md:h-20 sm:h-20 flex items-center justify-center text-[#F6AA1C] border-2 border-[#BC3908]">
                        {isFontAwesomeIcon ? (
                          <FontAwesomeIcon icon={category.icon} size="2x" />
                        ) : (
                          <category.icon size={40} />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center sm:items-start">
                      <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ fontFamily: "FMBindumathi"}}>{category.title_fon}</h2>
                      <p className="text-md sm:text-lg mb-4 font-extralight">{category.description}</p>
                    </div>
                  </div>
                );
              })}
            </AnimationSequence>
          </div>

          {/* Additional divs for contact and radio player */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Contact Details Div */}
            <div className="bg-[#220901]/90 p-6 rounded-lg shadow-lg border-2 border-[#941B0C] text-[#F6AA1C]">
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "IskolaPotha" }}>සම්බන්ධ කරගත හැකි ආකාරය</h3>
              <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">🚨</span> පොලිස් අධිකාරිය: <span className="font-bold ml-2">119 / 0112 433 333</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🚒</span> ගිනි අංශ: <span className="font-bold ml-2">110 / 0112 422 222</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🚑</span> සුබසාධන රථ: <span className="font-bold ml-2">1990 / 0112 677 111</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🏥</span> රාජකීය වෛද්‍ය සේවා: <span className="font-bold ml-2">0112 695 000</span>
              </li>
              </ul>
            </div>

            {/* Radio Player Div */}
            {/* hidden for a reason */}
            <div className="hidden bg-[#220901]/90 p-6 rounded-lg shadow-lg border-2 border-[#941B0C] text-[#F6AA1C]">
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "IskolaPotha" }}>රේඩියෝ සංදේශ</h3>
              <div className="flex flex-col items-center">
                <div className="w-full max-w-md bg-[#621708] p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">සිංහල ජන රේඩියෝ</span>
                    <span className="text-sm">FM 98.8</span>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <button className="p-2 rounded-full bg-[#BC3908] hover:bg-[#F6AA1C] text-[#F6AA1C] hover:text-[#220901]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="p-3 rounded-full bg-[#BC3908] hover:bg-[#F6AA1C] text-[#F6AA1C] hover:text-[#220901]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full bg-[#BC3908] hover:bg-[#F6AA1C] text-[#F6AA1C] hover:text-[#220901]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-4">
                    <div className="h-1 w-full bg-[#941B0C] rounded-full">
                      <div className="h-1 w-1/3 bg-[#F6AA1C] rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>10:45</span>
                      <span>දේශීය ප්‍රවෘත්ති</span>
                      <span>11:00</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#BC3908] hover:bg-[#F6AA1C] text-[#F6AA1C] hover:text-[#220901] rounded-md transition-all border-2 border-[#941B0C]">
                  සියලුම රේඩියෝ නාලිකා
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Show selected category content */}
      {selectedCategory && (
        <div>
          {/* Back button - shows on both mobile and desktop */}
          <button 
            onClick={() => setSelectedCategory(null)}
            className="mb-4 px-4 py-2 bg-[#BC3908] hover:bg-[#F6AA1C] text-[#F6AA1C] hover:text-[#220901] rounded-md flex items-center transition-all border-2 border-[#941B0C]"
          >
            <span className="mr-2">←</span> Back to categories
          </button>
          
          {/* Content container */}
          <div className="bg-[#220901]/90 p-4 rounded-lg shadow-lg border-2 border-[#941B0C] text-[#F6AA1C]">
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