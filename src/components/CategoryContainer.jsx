import React from "react";
import Announcements from "./category/announcements";
import ImportantLocations from "./category/ImportantLocations";
import Traffic from "./category/traffic";

function CategoryContainer() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-[#fc7515] p-4">
      <div className="flex justify-center items-center">
        <Announcements />
      </div>
      <div className="flex justify-center items-center">
        <Traffic />
      </div>
      <div className="flex justify-center items-center">
        <ImportantLocations />
      </div>
    </div>
  );
}

export default CategoryContainer;
