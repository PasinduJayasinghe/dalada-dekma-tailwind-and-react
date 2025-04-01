import React, { useState } from 'react';

function Notification({ messages = ["CHECK OUT THE NEW LIBRARY SPACES"] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + messages.length) % messages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
  };

  return (
    <div className="bg-[#fbb304] text-black py-3 px-8 relative flex items-center justify-center">
      {/* Left navigation arrow */}
      <button 
        onClick={goToPrevious} 
        className="absolute left-2 text-black hover:bg-yellow-500 rounded-full h-8 w-8 flex items-center justify-center"
        aria-label="Previous notification"
      >
        &lt;
      </button>
      
      {/* Notification text */}
      <div className="text-center font-bold uppercase tracking-wide">
        {messages[currentIndex]}
      </div>
      
      {/* Right navigation arrow */}
      <button 
        onClick={goToNext} 
        className="absolute right-2 text-black hover:bg-yellow-500 rounded-full h-8 w-8 flex items-center justify-center"
        aria-label="Next notification"
      >
        &gt;
      </button>
    </div>
  );
}

export default Notification;