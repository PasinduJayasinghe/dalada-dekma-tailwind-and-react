import React from "react";

function Banner(){
    return(
        <div className="w-full h-24 bg-amber-300 justify-center flex items-center relative overflow-hidden">
          <div className="relative z-10 flex justify-center sm:justify-start items-start w-full h-full">
            <img src="src\assets\images\logo.png" alt="Logo" className=" mt-6 ml-6 h-14" />
          </div>
        </div>
    );
}

export default Banner;