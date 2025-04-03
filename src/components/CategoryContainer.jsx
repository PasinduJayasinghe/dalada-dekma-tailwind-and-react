import React, { useState, useEffect } from "react";
import Announcements from "./category/announcements";
import ImportantLocations from "./category/ImportantLocations";
import Traffic from "./category/traffic";

function CategoryContainer() {
  const [currentView, setCurrentView] = useState("all");
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <div className="p-4 bg-white">
      {/* Mobile filter dropdown - only shows on mobile */}
      {isMobile && (
        <div className="mb-4">
          <select
            value={currentView}
            onChange={(e) => setCurrentView(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="all">සියල්ල</option>
            <option value="traffic">රථ වාහන තදබදය</option>
            <option value="announcements">වැදගත් තොරතුරු</option>
            <option value="locations">වැදගත් ස්ථාන</option>
          </select>
        </div>
      )}

      {/* Grid layout - conditionally renders components based on selection */}
      <div className={`grid gap-6 ${
        isMobile && currentView !== "all" 
          ? "grid-cols-1" 
          : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      }`}>
        {(currentView === "all" || currentView === "traffic") && (
          <div>
            <Traffic />
          </div>
        )}
        {(currentView === "all" || currentView === "announcements") && (
          <div>
            <Announcements />
          </div>
        )}
        {(currentView === "all" || currentView === "locations") && (
          <div>
            <ImportantLocations />
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryContainer;