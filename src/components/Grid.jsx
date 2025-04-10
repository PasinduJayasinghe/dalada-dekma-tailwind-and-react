import React from "react";
import "./Grid.css"; // Make sure you have this CSS file for styling

function Grid({ children, timestamp }) {
  return (
    <div className="mb-4 shadow-lg rounded-lg overflow-hidden bg-[#220901] p-3 border border-[#621708]">
      {timestamp && (
        <div className="text-sm text-[#F6AA1C] mb-2 font-mono">{timestamp}</div>
      )}
      <div className="bg-[#941B0C] bg-opacity-70 p-4 rounded-lg border border-[#BC3908]">
        <div className="text-[#F6AA1C]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Grid;  
