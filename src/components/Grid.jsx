import React from "react";

function Grid({ children, timestamp }) {
  return (
    <div className="mb-4">
      {timestamp && (
        <div className="text-sm text-gray-700 mb-2">{timestamp}</div>
      )}
      <div className="bg-[#fbb304] bg-opacity-20 p-4 rounded-lg">
        {children}
      </div>
    </div>
  );
}

export default Grid;