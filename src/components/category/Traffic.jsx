import React from "react";
import Grid from "../Grid"; // Import the Grid component

function Traffic() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-white">Traffic</h2>
      <div className="grid grid-cols-1 gap-4">
        <Grid>
          <h1>Traffic Info 1</h1>
        </Grid>
        <Grid>
          <h1>Traffic Info 2</h1>
        </Grid>
        <Grid>
          <h1>Traffic Info 3</h1>
        </Grid>
        {/* Add more grids as needed */}
      </div>
    </div>
  );
}

export default Traffic;
