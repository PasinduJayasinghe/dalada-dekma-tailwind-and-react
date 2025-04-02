import React from "react";
import "./Grid.css"; // Make sure you have this CSS file for styling

function Grid({ children, timestamp }) {
  return (
    <div className="mb-4 shadow-md rounded-lg overflow-hidden bg-yellow-50 p-3 border-b border-yellow-200 ">
      {timestamp && (
        <div className="text-sm text-gray-700 mb-2">{timestamp}</div>
      )}
      <div className="grid-container bg-[#fbb304] bg-opacity-20 p-4 rounded-lg">
        {children}
      </div>
    </div>
  );
}

export default Grid;  
