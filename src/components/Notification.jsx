import React, { useState, useEffect } from 'react';
import './notification.css'; // Import the CSS file

function Notification({ messages = [], interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('left'); // 'left' or 'right'
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (messages.length > 1 && interval > 0) {
      const timer = setInterval(() => {
        goToNextAuto();
      }, interval);
      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [messages, interval]);

  const goToPrevious = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setSlideDirection('right');
      setCurrentIndex((prevIndex) => (prevIndex - 1 + messages.length) % messages.length);
      setTimeout(() => setIsAnimating(false), 300); // Adjust timing with CSS transition
    }
  };

  const goToNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setSlideDirection('left');
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
      setTimeout(() => setIsAnimating(false), 300); // Adjust timing with CSS transition
    }
  };

  const goToNextAuto = () => {
    if (!isAnimating) {
      setSlideDirection('left');
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }
  };

  return (
    <div className="notification-bar bg-[#fbb304] text-black py-6 px-8 relative flex items-center justify-center overflow-hidden">
      {/* Left navigation arrow */}
      {messages.length > 1 && (
        <button
          onClick={goToPrevious}
          className="font-bold bg-amber-50 shadow-md absolute left-2 text-black hover:bg-yellow-500 rounded-full h-8 w-8 flex items-center justify-center z-10"
          aria-label="Previous notification"
        >
          &lt;
        </button>
      )}

      {/* Notification text */}
      <div
        className={`notification-text text-center font-bold uppercase tracking-wide absolute w-full`}
        style={{
          transform: isAnimating
            ? `translateX(${slideDirection === 'left' ? '-100%' : '100%'})`
            : 'translateX(0)',
          transition: isAnimating ? 'transform 0.3s ease-in-out' : 'none',
        }}
      >
        {messages[currentIndex]}
      </div>

      {/* Notification text (for the sliding effect) */}
      {isAnimating && (
        <div
          className={`notification-text next-text text-center font-bold uppercase tracking-wide absolute w-full`}
          style={{
            transform: `translateX(${slideDirection === 'left' ? '100%' : '-100%'})`,
            transition: 'none',
          }}
        >
          {messages[(currentIndex + (slideDirection === 'right' ? -1 : 1) + messages.length) % messages.length]}
        </div>
      )}

      {/* Right navigation arrow */}
      {messages.length > 1 && (
        <button
          onClick={goToNext}
          className="font-bold bg-amber-50 shadow-md absolute right-2 text-black hover:bg-yellow-500 rounded-full h-8 w-8 flex items-center justify-center z-10"
          aria-label="Next notification"
        >
          &gt;
        </button>
      )}
    </div>
  );
}

export default Notification;