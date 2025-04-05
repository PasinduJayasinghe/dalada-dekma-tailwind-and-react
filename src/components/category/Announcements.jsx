import React, { useState,useEffect } from "react";
import Grid from "../Grid";

function Announcements() {
  // State to store announcement data
  const [announcement, setAnnouncement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchAnnouncementData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/announcements"); // Replace with your API endpoint

        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        setAnnouncement(data);
        setLoading(false);
        setError(null); // Clear any previous error
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAnnouncementData();
  }, []);

  // Fallback UI states
  if (loading) return <div className="text-center py-6">පුවත් තොරතුරු පූරණය වෙමින්...</div>;
  if (error) return <div className="text-center py-6 text-red-500">දත්ත ලබා ගැනීමේ දෝෂයකි: {error}</div>;
  if (announcement.length === 0) return <div className="text-center py-8">පුවත් තොරතුරු යාවත්කාලීන කිරීම් නොමැත.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-300 text-center">
        වැදගත් තොරතුරු
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {announcement.map((announcement, index) => (
          <Grid key={index} timestamp={announcement.timestamp}>
            <div>
              <h3 className="text-lg font-bold mb-2">{announcement.title}</h3>
              <p>{announcement.content}</p>
            </div>
          </Grid>
        ))}
      </div>
    </div>
  );
}

export default Announcements;