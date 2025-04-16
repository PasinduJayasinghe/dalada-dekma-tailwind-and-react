import React from "react";
import "./Grid.css"; // Make sure you have this CSS file for styling

function Grid({ children, timestamp }) {
  return (
    <div className="mb-4 shadow-lg rounded-lg overflow-hidden bg-[#220901] p-3 border border-[#621708]">
      <div className="bg-[#941B0C] bg-opacity-70 p-4 rounded-lg border border-[#BC3908]">
        <div className="text-[#F6AA1C]">
          {children}
          {timestamp && (
            <div className="text-sm text-[#F6AA1C] mt-4 font-mono text-right font-extrabold">{timestamp}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Grid;  
