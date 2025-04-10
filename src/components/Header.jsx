import React from "react";

function Banner() {
  return (
    <div className="w-full h-32 flex items-center justify-center md:justify-between px-8 relative overflow-hidden bg-gradient-to-r from-[#220901] to-[#621708] shadow-lg border-b-4 border-[#F6AA1C] cursor-default">
      {/* Main Logo with artistic effects */}
      <div className="flex items-center space-x-4">
        <div className="relative group inline-flex items-center justify-center">
          <img 
            src="src/assets/images/logo2.png" 
            alt="Logo" 
            className="h-16 transition-all z-20 duration-500 group-hover:scale-110 group-hover:rotate-2 filter drop-shadow-lg"
          />
          <div className="absolute inset-0 bg-[#F6AA1C] opacity-0 group-hover:opacity-20 rounded-full blur-md transition-opacity duration-300"></div>
        </div>
        <div className="flex flex-col" style={{ fontFamily: 'TharuDigitalSansala'}}>
          <span className="text-[#F6AA1C] font-extrabold text-3xl tracking-widest">{`YS% o<od ud,s.dj`}</span>
          <span className="text-[#F6AA1C] text-2xl tracking-widest">{`uykqjr`}</span>
        </div>
      </div>


      <div
        className="hidden md:flex items-center justify-center space-x-4 animate-fadeIn"
        style={{ fontFamily: 'TharuDigitalSansala' }}
      >
        <span
          className="text-[#F6AA1C] font-bold text-5xl tracking-widest transform transition-all duration-500 drop-shadow-[0_0_10px_#F6AA1C] hover:drop-shadow-[0_0_20px_#F6AA1C]"
        >
          {`o,od oelau 2025`}
        </span>
      </div>

      {/* Accent elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#941B0C] via-[#BC3908] to-[#941B0C]"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#941B0C] rounded-full mix-blend-multiply opacity-20 transform translate-x-16 -translate-y-16"></div>
    </div>
  );
}

export default Banner;