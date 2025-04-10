import React, { useState, useEffect } from "react";
import Grid from "../Grid";
import AnimationSequence from "../Animation/AnimationSequence";

function WeatherReports() {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      const dummyAnnouncements = [
        {
          id: 1,
          title: "වර්ෂාවේ තීව්‍රතාවය",
          content: "ලබන සතියේ සිට වර්ෂාවේ තීව්‍රතාවය වැඩි වීමක් බලාපොරොත්තු වේ. වැසි වලාකුළු සහිත දින ගණන වැඩි විය හැකිය.",
          createdDate: "2025-04-10T09:30:00"
        },
        {
          id: 2,
          title: "සුළං අනතුරු ඇඟවීම",
          content: "උතුරු සහ නැගෙනහිර පළාත්වල සුළං වේගය විනාඩියකට කිලෝමීටර 40-50 පමණ විය හැකිය. ගොවීන් සහ මතුපිට ගමන් කරන ජනතාව අවධානයෙන් සිටින්න.",
          createdDate: "2025-04-08T14:15:00"
        }
      ];

      const sortedData = dummyAnnouncements.sort((a, b) =>
        new Date(b.createdDate) - new Date(a.createdDate)
      );
      
      setAnnouncements(sortedData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);

    /*
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('https://localhost:7249/api/Notices/category/4');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
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
    const interval = setInterval(fetchAnnouncements, 300000);
    return () => clearInterval(interval);
    */
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-300"></div>
        <span className="ml-4">Loading weather reports...</span>
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
      <h2 className="text-4xl font-semibold mb-4 border-b pb-2 border-amber-300 text-center" style={{ fontFamily: "IskolaPotha"}}>
        {/* {'l%shd;a; m%fõYh'} */}
        කාලගුන වාර්තා
      </h2>
      {announcements.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No weather reports available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimationSequence 
            direction="right" 
            baseDelay={100} 
            staggerDelay={150} 
            duration={800} 
            distance={30} 
            easing="ease-out"
            className="contents"
          >
          {announcements.map((announcement) => (
            <Grid key={announcement.id} timestamp={announcement.createdDate}>
              <div style={{ fontFamily : "NotoSansSinhala" }}>
                <h3 className="text-lg font-bold mb-2">{announcement.title}</h3>
                <p className="whitespace-pre-line">{announcement.content}</p>
              </div>
            </Grid>
          ))}
          </AnimationSequence>
        </div>
      )}
    </div>
  );
}

export default WeatherReports;