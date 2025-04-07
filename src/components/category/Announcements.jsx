import React, { useState, useEffect } from "react";
import Grid from "../Grid";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('https://localhost:7249/api/Notices/category/6');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Sort announcements by date (newest first)
        const sortedData = data.sort((a, b) => 
          new Date(b.createdDate) - new Date(a.createdDate)
        );
        setAnnouncements(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();

    // Optional: Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchAnnouncements, 300000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4">Loading announcements...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading announcements: {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-300 text-center">
        වැදගත් තොරතුරු
      </h2>
      {announcements.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No important announcements available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
          {announcements.map((announcement, index) => (
            <Grid key={announcement.id} timestamp={announcement.createdDate}>
              <div>
                <h3 className="text-lg font-bold mb-2">{announcement.title}</h3>
                <p className="whitespace-pre-line">{announcement.content}</p>
                {announcement.categoryName && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                    {announcement.categoryName}
                  </span>
                )}
              </div>
            </Grid>
          ))}
        </div>
      )}
    </div>
  );
}

export default Announcements;