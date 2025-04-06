import React from "react";
import Grid from "../Grid";

function Traffic() {
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-300 text-center">
        රථ වාහන තදබදය පිලිබද තොරතුරු
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {trafficUpdates.map((update, index) => (
          <Grid key={index} timestamp={update.timestamp}>
            <div>
              <h3 className="text-lg font-bold mb-2">{update.title}</h3>
              <p>{update.content}</p>
            </div>
          </Grid>
        ))}
      </div>
    </div>
  );
}

export default Traffic;