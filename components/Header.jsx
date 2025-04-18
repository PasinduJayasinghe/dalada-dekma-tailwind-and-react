import React, { useEffect, useState } from "react";
import Logo2 from '../assets/images/logo2.png';


function Banner() {
  const [flowers, setFlowers] = useState([]);
  const flowerImage = (type) => new URL(`../assets/images/${type}.png`, import.meta.url).href;

  
  // Generate random flower positions on component mount
  useEffect(() => {
    const generateFlowers = () => {
      const flowerCount = 10;
      const newFlowers = [];
      const minDistance = 20; // Minimum distance between flower centers (percentage)
      const maxAttempts = 50; // Maximum attempts to place a flower
      
      for (let i = 0; i < flowerCount; i++) {
        let attempts = 0;
        let valid = false;
        let newFlower;
        
        // Try to place the flower in a non-overlapping position
        while (!valid && attempts < maxAttempts) {
          attempts++;
          
          newFlower = {
            id: i,
            x: 5 + Math.random() * 85, // Keep away from edges (5% to 90%)
            y: 10 + Math.random() * 80, // Keep away from edges (10% to 90%)
            rotate: Math.random() * 360,
            type: Math.random() > 0.5 ? 'flower01' : 'flower02',
            opacity: 0.1 + Math.random() * 0.2,
          };
          
          // Check if this position is valid (not too close to other flowers)
          valid = true;
          for (const existingFlower of newFlowers) {
            const distance = Math.sqrt(
              Math.pow(newFlower.x - existingFlower.x, 2) + 
              Math.pow(newFlower.y - existingFlower.y, 2)
            );
            
            if (distance < minDistance) {
              valid = false;
              break;
            }
          }
        }
        
        // If we found a valid position, add the flower
        if (valid) {
          newFlowers.push(newFlower);
        }
      }
      
      setFlowers(newFlowers);
    };
    
    generateFlowers();
  }, []);

  return (
    <div className="w-full h-28 flex items-center justify-center md:justify-between px-8 relative overflow-hidden bg-gradient-to-r from-[#220901] to-[#621708] shadow-lg cursor-default">
      {/* Flower background elements */}
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="absolute pointer-events-none"
          style={{
            left: `${flower.x}%`,
            top: `${flower.y}%`,
            transform: `rotate(${flower.rotate}deg)`,
            opacity: flower.opacity,
            zIndex: 1,
          }}
        >
          <img 
            src={flowerImage(flower.type)} 
            alt="Decorative flower" 
            className="w-16 h-16"
          />
        </div>
      ))}

      {/* Main Logo with artistic effects */}
      <div className="hidden md:flex items-center z-40 space-x-4">
        {/* CHANGE HERE: Wrapped the div in an anchor tag */}
        <a href="/" className="relative group inline-flex items-center justify-center">
          <img
            src={Logo2}
            alt="Logo"
            className="h-16 transition-all z-20 duration-500 group-hover:scale-110 group-hover:rotate-2 filter drop-shadow-lg"
          />

          <div className="absolute inset-0 bg-[#F6AA1C] opacity-0 group-hover:opacity-20 rounded-full blur-md transition-opacity duration-300"></div>
        </a>
        <div className="flex flex-col" style={{ fontFamily: 'FMBindumathi'}}>
          <span className="text-[#F6AA1C] font-extrabold text-3xl">{`YS% o<od ud,s.dj`}</span>
          <span className="text-[#F6AA1C] text-2xl">{`uykqjr`}</span>
        </div>
      </div>
        
      <div
        className="flex items-center z-40 justify-center space-x-4 animate-fadeIn"
        style={{ fontFamily: 'FMBindumathi' }}
      >
        {/* CHANGE HERE: Wrapped the mobile logo div in an anchor tag */}
        <a href="/" className="md:hidden relative group inline-flex items-center justify-center">
          <img
            src={Logo2}
            alt="Logo"
            className="h-16 transition-all z-20 duration-500 group-hover:scale-110 group-hover:rotate-2 filter drop-shadow-lg"
          />

          <div className="absolute inset-0 bg-[#F6AA1C] opacity-0 group-hover:opacity-20 rounded-full blur-md transition-opacity duration-300"></div>
        </a>
        <span
          className="text-[#F6AA1C] font-bold text-3xl md:text-4xl lg:text-5xl md:text-right  transform transition-all duration-500 drop-shadow-[0_0_10px_#F6AA1C] hover:drop-shadow-[0_0_20px_#F6AA1C]"
        >
          {`isrs o<od`} <br className="block sm:hidden" /> {`jkaokdj 2025`}
          {/* සිරි දළදා දැක්ම <br className="block lg:hidden" /> 2025 */}
        </span>
      </div>
    </div>
  );
}

export default Banner;