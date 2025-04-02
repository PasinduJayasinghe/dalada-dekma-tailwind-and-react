import React from "react";
import Grid from "../Grid";
function ImportantLocationsGrid({ locations = [] }) {
  // If no locations are provided, display a message
  if (locations.length === 0) {
    return (
      <div className="bg-gray-100 p-4 rounded-md text-center">
        <p className="text-gray-600">No important locations have been added yet.</p>
      </div>
    );
  }

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {locations.map((location, index) => (
        <div key={index} className="bg-[#fbb304] shadow-md rounded-lg overflow-hidden">
          <div className="bg-yellow-50 p-3 border-b border-yellow-200">
            <p className="text-sm text-gray-600">{location.timestamp}</p>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-2">{location.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImportantLocationsGrid;