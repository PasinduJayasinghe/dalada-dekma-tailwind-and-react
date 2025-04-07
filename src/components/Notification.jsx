import React, { useState, useEffect } from 'react';
import './notification.css';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

function Notification({ messages = [], databaseNotifications = [], interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('left');
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayMessages, setDisplayMessages] = useState([]);

  // Combine hardcoded messages with active database notifications
  useEffect(() => {
    const activeDbNotifications = databaseNotifications
      .filter(notification => notification.isActive)
      .map(notification => notification.content);
    
    const combined = [...messages, ...activeDbNotifications];
    setDisplayMessages(combined.length > 0 ? combined : []);
  }, [messages, databaseNotifications]);

  useEffect(() => {
    if (displayMessages.length > 1 && interval > 0) {
      const timer = setInterval(() => {
        goToNextAuto();
      }, interval);
      return () => clearInterval(timer);
    }
  }, [displayMessages, interval, currentIndex]);

  const goToPrevious = () => {
    if (displayMessages.length <= 1 || isAnimating) return;
    
    setIsAnimating(true);
    setSlideDirection('right');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + displayMessages.length) % displayMessages.length);
      setIsAnimating(false);
    }, 300);
  };

  const goToNext = () => {
    if (displayMessages.length <= 1 || isAnimating) return;
    
    setIsAnimating(true);
    setSlideDirection('left');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % displayMessages.length);
      setIsAnimating(false);
    }, 300);
  };

  const goToNextAuto = () => {
    if (displayMessages.length <= 1 || isAnimating) return;
    
    setIsAnimating(true);
    setSlideDirection('left');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % displayMessages.length);
      setIsAnimating(false);
    }, 300);
  };

  if (displayMessages.length === 0) return null;

  return (
    <div className="notification-bar cursor-default bg-amber-500 text-black py-4 px-8 flex items-center justify-center overflow-hidden relative min-h-[60px]">
      {/* Left navigation arrow */}
      {displayMessages.length > 1 && (
        <button
          onClick={goToPrevious}
          className="font-bold bg-amber-100 hover:bg-amber-200 cursor-pointer shadow-md absolute left-2 text-black rounded-full h-8 w-8 flex items-center justify-center z-10 transition-colors duration-200"
          aria-label="Previous notification"
        >
          <BsChevronCompactLeft size={20} className="ml-0.5" />
        </button>
      )}

      {/* Notification text container */}
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
        {/* Current notification text */}
        <div
          className={`notification-text text-center text-sm sm:text-base md:text-lg font-bold uppercase tracking-wide w-full ${
            isAnimating
              ? slideDirection === 'left'
                ? 'animate-slide-out-left'
                : 'animate-slide-out-right'
              : ''
          }`}
        >
          {displayMessages[currentIndex]}
        </div>

        {/* Next notification text (for animation) */}
        {isAnimating && (
          <div
            className={`notification-text text-center text-sm sm:text-base md:text-lg font-bold uppercase tracking-wide w-full ${
              slideDirection === 'left'
                ? 'animate-slide-in-left'
                : 'animate-slide-in-right'
            }`}
          >
            {displayMessages[(currentIndex + (slideDirection === 'right' ? -1 : 1) + displayMessages.length) % displayMessages.length]}
          </div>
        )}
      </div>

      {/* Right navigation arrow */}
      {displayMessages.length > 1 && (
        <button
          onClick={goToNext}
          className="font-bold bg-amber-100 hover:bg-amber-200 cursor-pointer shadow-md absolute right-2 text-black rounded-full h-8 w-8 flex items-center justify-center z-10 transition-colors duration-200"
          aria-label="Next notification"
        >
          <BsChevronCompactRight size={20} className="mr-0.5" />
        </button>
      )}
    </div>
  );
}

export default Notification;