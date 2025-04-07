import React, { useState, useEffect } from "react";
import Grid from "../Grid";

function Traffic() {
  const [trafficUpdates, setTrafficUpdates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrafficUpdates = async () => {
      try {
        const response = await fetch('https://localhost:7249/api/Notices/category/2');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTrafficUpdates(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrafficUpdates();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading traffic updates: {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-300 text-center">
        රථ වාහන තදබදය පිලිබද තොරතුරු
      </h2>
      {trafficUpdates.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No traffic updates available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
          {trafficUpdates.map((update, index) => (
            <Grid key={index} timestamp={update.createdDate}>
              <div>
                <h3 className="text-lg font-bold mb-2">{update.title}</h3>
                <p className="whitespace-pre-line">{update.content}</p>
              </div>
            </Grid>
          ))}
        </div>
      )}
    </div>
  );
}

export default Traffic;