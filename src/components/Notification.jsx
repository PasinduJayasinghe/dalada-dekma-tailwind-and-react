import React, { useState, useEffect, useMemo } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import './notification.css';

function Notification({ staticMessages = [], interval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('left');
  const [isAnimating, setIsAnimating] = useState(false);
  const [databaseNotifications, setDatabaseNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dummy data for Sri Dalada Perahera notifications
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      const dummyNotifications = [
        {
          id: 1,
          content: "ශ්‍රී දළදා මාළිගාව විවෘත වේලාවන්: උදෑසන 5.30 සිට සවස 8.00 දක්වා",
          isActive: true
        },
        {
          id: 2,
          content: "දළදා පෙරහැර ආරම්භය: ලබන අගහරුවාදා සවස 7.00 ට",
          isActive: true
        },
        {
          id: 3,
          content: "පූජා සඳහා විශේෂ පූජා භාණ්ඩ ගෙන ඒමෙන් වලකින්න",
          isActive: true
        },
        {
          id: 4,
          content: "ප්‍රධාන ප්‍රදර්ශන ශාලාවේ පිවිසුම් ටිකට්ටු ලබා ගැනීම සඳහා පූර්ව ඇණවුම් කරන්න",
          isActive: true
        },
        {
          id: 5,
          content: "ආරක්ෂක පරීක්ෂණ සඳහා පැමිණෙන සියලුම භක්තිකයින් සාදරයෙන් පිළිගනිමු",
          isActive: true
        }
      ];

      setDatabaseNotifications(dummyNotifications);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, []);

  
  // Original API call code (commented)
  useEffect(() => {
    const controller = new AbortController();
    
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notifications', {
          signal: controller.signal
        });
        
        if (response.ok) {
          const data = await response.json();
          setDatabaseNotifications(data);
        } else {
          console.error('Failed to fetch notifications');
          setDatabaseNotifications([]);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching notifications:', error);
          setDatabaseNotifications([]);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNotifications();
    
    return () => controller.abort();
  }, []);
  

  // Combine and memoize messages
  const displayMessages = useMemo(() => {
    if (isLoading) return staticMessages.length > 0 ? staticMessages : ['ප්‍රකාශන ලබා ගැනීමට සූදානම් වෙමින්...'];
    
    const activeDbNotifications = Array.isArray(databaseNotifications)
      ? databaseNotifications
          .filter(notification => notification.isActive)
          .map(notification => notification.content)
      : [];

    const combined = [...staticMessages, ...activeDbNotifications];
    return combined.length > 0 ? combined : ['පවතින ප්‍රකාශන නොමැත'];
  }, [staticMessages, databaseNotifications, isLoading]);

  // Auto-rotation effect
  useEffect(() => {
    if (displayMessages.length <= 1) return;
    
    const timer = setInterval(() => {
      if (!isAnimating) {
        goToNextAuto();
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [displayMessages, interval, isAnimating]);

  const goToPrevious = () => {
    if (displayMessages.length <= 1 || isAnimating) return;
    
    setIsAnimating(true);
    setSlideDirection('right');
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + displayMessages.length) % displayMessages.length);
      setIsAnimating(false);
    }, 300);
  };

  const goToNext = () => {
    if (displayMessages.length <= 1 || isAnimating) return;
    
    setIsAnimating(true);
    setSlideDirection('left');
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % displayMessages.length);
      setIsAnimating(false);
    }, 300);
  };

  const goToNextAuto = () => {
    goToNext();
  };

  if (displayMessages.length === 0) return null;

  return (
    <div className="notification-container cursor-default">
      <div className="notification-bar">
        {displayMessages.length > 1 && (
          <button
            onClick={goToPrevious}
            className="nav-button prev-button"
            aria-label="පසු ප්‍රකාශය"
          >
            <BsChevronCompactLeft size={20} />
          </button>
        )}

        <div className="messages-container">
          <div
            className={`message ${isAnimating ? (slideDirection === 'left' ? 'slide-out-left' : 'slide-out-right') : ''}`}
            style={{ fontFamily: "NotoSansSinhala" }}
          >
            {displayMessages[currentIndex]}
          </div>

          {isAnimating && (
            <div
              className={`message ${slideDirection === 'left' ? 'slide-in-left' : 'slide-in-right'}`}
              style={{ fontFamily: "NotoSansSinhala" }}
            >
              {displayMessages[
                (currentIndex + (slideDirection === 'right' ? -1 : 1) + displayMessages.length) % 
                displayMessages.length
              ]}
            </div>
          )}
        </div>

        {displayMessages.length > 1 && (
          <button
            onClick={goToNext}
            className="nav-button next-button"
            aria-label="මීළඟ ප්‍රකාශය"
          >
            <BsChevronCompactRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Notification;