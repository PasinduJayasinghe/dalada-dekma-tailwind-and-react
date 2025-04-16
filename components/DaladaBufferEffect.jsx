import React, { useEffect, useState } from 'react';
import DaladaLogo from '../assets/images/logo2.png'

const DaladaBufferEffect = () => {
  const [loaded, setLoaded] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.9);
  const [bufferScale, setBufferScale] = useState(1);
  const [bufferOpacity, setBufferOpacity] = useState(1);
  
  useEffect(() => {
    // Initial animation for the logo
    const logoTimer = setTimeout(() => {
      setLoaded(true);
      setOpacity(1);
      setScale(1);
    }, 1000);
    
    // Fade out and scale up animation for the entire buffer
    const bufferTimer = setTimeout(() => {
      setBufferScale(1.1); // Slightly scale up
      setBufferOpacity(0); // Fade out
    }, 2500);
    
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(bufferTimer);
    };
  }, []);
  
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-amber-800 ${loaded ? 'pointer-events-none' : ''}`}
    style={{
        opacity: bufferOpacity,
        transform: `scale(${bufferScale})`,
        transition: 'opacity 1.2s ease-out, transform 1.2s ease-out'
      }}
    >
      <div className="relative">
        {/* Pulsing rings */}
        <div className={`absolute inset-0 rounded-full bg-amber-500/10 animate-ping transition-opacity duration-1000 ${loaded ? 'opacity-0' : 'opacity-100'}`}></div>
        <div className={`absolute inset-0 rounded-full bg-amber-500/20 animate-pulse`}></div>
        
        {/* Logo with buffer effect */}
        <div className="relative" 
          style={{
            transform: `scale(${scale})`,
            opacity: opacity,
            transition: 'transform 1s ease-out, opacity 1s ease-out'
          }}>
          <div className="w-64 h-64 md:w-80 md:h-80 relative">
            <div className="absolute inset-0 bg-amber-500/20 rounded-full animate-pulse"></div>
            <img 
              src={DaladaLogo}
              alt="Sri Dalada Maligawa - Kandy" 
              className="w-full h-full object-contain relative z-10"
            />
          </div>
          
          {/* Shadow beneath logo */}
          <div className="absolute -bottom-4 inset-x-0 h-4 bg-black/10 rounded-full blur-md"></div>
        </div>
      </div>
      
      {/* Loading text */}
      <div className={`absolute bottom-20 z-50 text-center transition-opacity duration-1000 ${loaded ? 'opacity-0' : 'opacity-100'}`}>
        <p className="text-yellow-400 text-lg font-semibold">Loading Sri Dalada Maligawa</p>
        <div className="flex justify-center mt-2 space-x-2">
          {[0, 1, 2].map((dot) => (
            <div 
              key={dot} 
              className="w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                animation: `bounce 1.4s ease-in-out ${dot * 0.2}s infinite`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default DaladaBufferEffect;