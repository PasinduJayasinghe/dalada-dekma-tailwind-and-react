import React from "react";
import Announcements from "./category/announcements";
import ImportantLocations from "./category/ImportantLocations";
import Traffic from "./category/traffic";

function CategoryContainer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-white">
      <div>
        <Traffic />
      </div>
      <div>
        <Announcements />
      </div>
      <div>
        <ImportantLocations />
      </div>
    </div>
  );
}

export default CategoryContainer;