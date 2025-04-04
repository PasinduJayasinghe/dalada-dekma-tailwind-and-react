import React, { useState, useEffect } from "react";
import Announcements from "./category/announcements";
import ImportantLocations from "./category/ImportantLocations";
import Traffic from "./category/traffic";
import Background from "../assets/images/daladamaligawa2.jpg.png";
import { FaTrafficLight, FaBullhorn, FaMapMarkerAlt } from "react-icons/fa";

function CategoryContainer() {
  const categories = [
    {
      id: "traffic",
      title: "රථ වාහන තදබදය",
      description: "Traffic updates and information",
      component: Traffic,
      icon: FaTrafficLight
    },
    {
      id: "announcements",
      title: "වැදගත් තොරතුරු",
      description: "Important announcements",
      component: Announcements,
      icon: FaBullhorn
    },
    {
      id: "locations",
      title: "වැදගත් ස්ථාන",
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
         style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 0, 0.5)), url(${Background})` }}>
      
      {/* Mobile dropdown - always visible on mobile */}
      {isMobile && (
        <div className="mb-4">
          <select
            onChange={(e) => handleDropdownSelect(e.target.value)}
            value={selectedCategory || "all"}
            className="w-full p-2 border border-gray-300 rounded-md"
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
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <div 
                key={category.id}
                onClick={() => handleTileClick(category.id)}
                className="grid sm:grid-cols-2 bg-yellow-300 hover:bg-[#800000] hover:text-white p-4 rounded-lg shadow cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col justify-center items-center sm:items-start">
                  <h2 className="text-lg sm:text-2xl font-extrabold mb-2">{category.title}</h2>
                  <p className="text-sm sm:text-lg mb-4 font-extralight">{category.description}</p>
                </div>
                <div className="flex justify-center items-center">
                  <div className="p-3 bg-white rounded-full w-16 h-16 flex items-center justify-center text-[#800000]">
                    <Icon size={30} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Show selected category content */}
      {selectedCategory && (
        <div>
          {/* Back button - shows on both mobile and desktop */}
          <button 
            onClick={() => setSelectedCategory(null)}
            className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center transition-all"
          >
            <span className="mr-2">←</span> Back to categories
          </button>
          
          {/* Content container */}
          <div className="bg-white p-4 rounded-lg shadow">
            {(() => {
              const category = categories.find(c => c.id === selectedCategory);
              const CategoryComponent = category?.component;
              return CategoryComponent ? <CategoryComponent /> : null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryContainer;