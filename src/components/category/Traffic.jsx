import React, { useState, useEffect } from "react";
import Grid from "../Grid";

function Traffic() {
  // State to store traffic data
  const [trafficUpdates, setTrafficUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchTrafficData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/traffic-updates'); // Replace with your API endpoint
        
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        setTrafficUpdates(data);
        setLoading(false);
        setError(null); // Clear any previous error
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTrafficData();
  }, []);

  // Fallback UI states
  if (loading) return <div className="text-center py-6">රථ වාහන තොරතුරු පූරණය වෙමින්...</div>;
  if (error) return <div className="text-center py-6 text-red-500">දත්ත ලබා ගැනීමේ දෝෂයකි: {error}</div>;
  if (trafficUpdates.length === 0) return <div className="text-center py-8">රථ වාහන තොරතුරු යාවත්කාලීන කිරීම් නොමැත.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-300 text-center">
        රථ වාහන තදබදය පිලිබද තොරතුරු
      </h2>
      {trafficUpdates.map((update, index) => (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          
            <Grid key={index} timestamp={update.timestamp}>
              <div>
                <h3 className="text-lg font-bold mb-2">{update.title}</h3>
                <p>{update.content}</p>
              </div>
            </Grid>
        </div>
      ))}
    </div>
  );
}

export default Traffic;