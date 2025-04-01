import React from "react";
import Grid from "../Grid";

function Announcements() {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-300">Important Notices</h2>
      
      <Grid timestamp="March 28, 2024 - 9:00 AM">
        <div>
          <h3 className="text-lg font-bold mb-2">Entry Requirements</h3>
          <p>Please bring your ID and follow the security protocols at the entrance.</p>
        </div>
      </Grid>
      
      <Grid timestamp="March 28, 2024 - 8:30 AM">
        <div>
          <h3 className="text-lg font-bold mb-2">Weather Advisory</h3>
          <p>Umbrellas and rain protection recommended due to possible light showers.</p>
        </div>
      </Grid>
    </div>
  );
}

export default Announcements;