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
import { FaTrafficLight, FaBullhorn, FaMapMarkerAlt, FaUtensils, FaToilet, FaMedkit, FaSearch, FaCar, FaFire, FaWater, FaCloudSun, FaInfoCircle, FaQuestion, FaFacebook, FaYoutube, FaGlobe } from "react-icons/fa";
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
      title: "වාහන නතර කිරීම් හා ප්‍රවාහන සේවාසේවා",
      title_fon: "jdyk k;r lsÍï yd fiajd",
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

  useEffect(() => {
    if (selectedCategory) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }, [selectedCategory]);

  const handleTileClick = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const handleDropdownSelect = (categoryId) => {
    setSelectedCategory(categoryId === "all" ? null : categoryId);
  };

  return (
    <div className="cursor-default p-4 bg-cover bg-center min-h-screen flex flex-col" 
      style={{ 
        backgroundImage: `linear-gradient(rgba(200, 200, 255, 0.7), rgba(200, 200, 8, 0.5)), url(${Background})`
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
                      {/* <div className="p-3 bg-[#220901] rounded-full w-28 md:w-24 sm:w-20 md:h-20 sm:h-20 flex items-center justify-center text-[#F6AA1C] border-2 border-[#BC3908]"> */}
                        {isFontAwesomeIcon ? (
                          <FontAwesomeIcon icon={category.icon} size="2x" />
                        ) : (
                          <category.icon size={56} />
                        )}
                      {/* </div> */}
                    </div>
                    <div className="flex flex-col justify-center items-center text-center">
                      <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ fontFamily: "FMBindumathi"}}>{category.title_fon}</h2>
                      <p className="text-md sm:text-lg mb-4 font-extralight">{category.description}</p>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Additional divs for contact and radio player */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Contact Details Div */}
            <div className="bg-[#220901]/90 p-6 rounded-lg shadow-lg border-2 border-[#941B0C] text-[#F6AA1C]">
              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ fontFamily: "NotoSansSinhala" }}>
                සම්බන්ධ කරගත හැකි ආකාරය
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Emergency Contacts */}
              <div className="mb-6">
                <h4 className="text-lg sm:text-xl font-bold mb-3" style={{ fontFamily: "NotoSansSinhala" }}>ක්ෂණික ඇමතුම්</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">🚨</span> පොලිස් අධිකාරිය: <span className="font-bold ml-2">119 / 0112 433 333 / 118</span>
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

              {/* Useful Phone Numbers */}
              <div className="mb-6">
                <h4 className="text-lg sm:text-xl font-bold mb-3" style={{ fontFamily: "NotoSansSinhala" }}>ප්‍රයෝජනවත් දුරකථන අංක</h4>
                <ul className="space-y-3">
                  <li className="flex">
                    <span className="font-bold min-w-[1.5rem]">1.</span>
                    <span>මහනුවර මහ නගර සභාව: <span className="font-bold">0812 222 275</span></span>
                  </li>
                  <li className="flex">
                    <span className="font-bold min-w-[1.5rem]">2.</span>
                    <span>මහනුවර දුම්රිය ස්ථානය: <span className="font-bold">0812 222 271</span></span>
                  </li>
                  <li className="flex">
                    <span className="font-bold min-w-[1.5rem]">3.</span>
                    <span>ශ්‍රී දළදා මාලිගාව පොලිස් ස්ථානය: <span className="font-bold">0812 225 722</span></span>
                  </li>
                  <li className="flex">
                    <span className="font-bold min-w-[1.5rem]">4.</span>
                    <span>මහනුවර පොලිස් ස්ථානය: <span className="font-bold">0812 222 222</span></span>
                  </li>
                  <li className="flex">
                    <span className="font-bold min-w-[1.5rem]">5.</span>
                    <span>මහනුවර ගිනි නිවීමේ දෙපාර්තමේන්තුව: <span className="font-bold">0812 204 844</span></span>
                  </li>
                </ul>
              </div>
              </div>
              {/* Social Media Links */}
              <div className="mt-6 pt-4 border-t border-[#941B0C]">
                <h4 className="text-xl font-bold mb-3" style={{ fontFamily: "NotoSansSinhala" }}>අපව සොයාගන්න</h4>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://www.facebook.com/sridaladamaligawa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center bg-[#3b5998] hover:bg-[#334d84] text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaFacebook className="mr-2" /> Facebook
                  </a>
                  
                  <a 
                    href="https://www.youtube.com/@sridalada" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center bg-[#ff0000] hover:bg-[#cc0000] text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaYoutube className="mr-2" /> YouTube
                  </a>
                  
                  <a 
                    href="https://sridaladamaligawa.lk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center bg-[#941B0C] hover:bg-[#7a160a] text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaGlobe className="mr-2" /> Website
                  </a>
                </div>
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