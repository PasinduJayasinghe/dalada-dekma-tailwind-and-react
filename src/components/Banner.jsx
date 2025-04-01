import React from "react";

function Banner(){
    return(
        <div className="relative w-full h-[300px]">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80">
            <img src="src\assets\images\daladamaligawa.jpg" alt="Banner" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <img src="src\assets\images\logo.png" alt="Logo" className="h-24" />
        </div>
    
        </div>
    );
}

export default Banner;