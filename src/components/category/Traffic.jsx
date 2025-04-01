import React from "react";
import Grid from "../Grid";

function Traffic() {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-300">Traffic Updates</h2>
      
      <Grid timestamp="March 28, 2024 - 8:00 AM">
        <div>
          <h3 className="text-lg font-bold mb-2">Road Closures</h3>
          <p>Main roads leading to Sri Dalada Maligawa will be closed from 6:00 AM to 8:00 PM.</p>
        </div>
      </Grid>
      
      <Grid timestamp="March 28, 2024 - 7:30 AM">
        <div>
          <h3 className="text-lg font-bold mb-2">Parking Information</h3>
          <p>Designated parking areas available at Kandy Lake View Parking and City Center Parking.</p>
        </div>
      </Grid>
    </div>
  );
}

export default Traffic;