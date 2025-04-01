import React from "react";
import Grid from "../Grid";

function ImportantLocations() {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-300">Important Locations</h2>
      
      <Grid timestamp="March 28, 2024 - 10:00 AM">
        <div>
          <h3 className="text-lg font-bold mb-2">Main Entrance</h3>
          <p>Located at Sri Dalada Maligawa main gate. Please arrive 30 minutes before your scheduled time.</p>
        </div>
      </Grid>
      
      <Grid timestamp="March 28, 2024 - 9:30 AM">
        <div>
          <h3 className="text-lg font-bold mb-2">Information Center</h3>
          <p>Visit our information center near the main entrance for any assistance.</p>
        </div>
      </Grid>
    </div>
  );
}

export default ImportantLocations;