import React, { useState, useEffect } from "react";
import Announcements from "./category/announcements";
import ImportantLocations from "./category/ImportantLocations";
import Traffic from "./category/traffic";
import Background from "../assets/images/daladamaligawa3.png";
import { FaTrafficLight, FaBullhorn, FaMapMarkerAlt } from "react-icons/fa";
import AnimationSequence from "./Animation/AnimationSequence";

function CategoryContainer() {
  const categories = [
    {
      id: "traffic",
      title: "රථ වාහන තදබදය",
      title_fon: "r: jdyk ;onoh",
      description: "Traffic updates and information",
      component: Traffic,
      icon: FaTrafficLight
    },
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
        <div className={`grid gap-6 ${isMobile ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}>
          <AnimationSequence 
            direction="right" 
            baseDelay={100} 
            staggerDelay={150} 
            duration={800} 
            distance={30} 
            easing="ease-out"
            className="contents"
          >
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <div 
                  key={category.id}
                  onClick={() => handleTileClick(category.id)}
                  className="grid sm:grid-cols-2 bg-[#621708]/90 hover:bg-[#F6AA1C] h-56 text-[#F6AA1C] hover:text-[#220901] p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-[#941B0C]"
                >
                  <div className="flex justify-center items-center">
                    <div className="p-3 bg-[#220901] rounded-full w-28 md:w-24 sm:w-20 md:h-20 sm:h-20 flex items-center justify-center text-[#F6AA1C] border-2 border-[#BC3908]">
                      <Icon size={40} />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center sm:items-start">
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ fontFamily: "TharuDigitalRun"}}>{category.title_fon}</h2>
                    <p className="text-md sm:text-lg mb-4 font-extralight">{category.description}</p>
                  </div>
                </div>
              );
            })}
          </AnimationSequence>
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