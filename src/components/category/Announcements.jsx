import React, { useState, useEffect } from "react";
import Grid from "../Grid";
import AnimationSequence from "../Animation/AnimationSequence"; // Import the AnimationSequence component

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading delay
    const loadingTimer = setTimeout(() => {
      // Dummy announcements data
      const dummyAnnouncements = [
        {
          id: 1,
          title: "සැම දෙනාටම සුභ අලුත් අවුරුද්දක් වේවා",
          content: "අපගේ සියලුම පාඨකයින්ට සුභ සිංහල හා දමිළ අලුත් අවුරුද්දක් වේවා! අද දින සිට අප කාර්යාලය දින 3ක් වසා තැබේ.",
          createdDate: "2025-04-07T09:30:00"
        },
        {
          id: 2,
          title: "නව පරිගණක විද්‍යාගාරය විවෘත කිරීම",
          content: "අප ආයතනයේ නව පරිගණක විද්‍යාගාරය ලබන සතියේ විවෘත කෙරේ. සියලුම සිසුන් සහභාගී වන්න.",
          createdDate: "2025-04-05T14:15:00"
        },
        {
          id: 3,
          title: "2025 අයදුම්පත් භාරගැනීම",
          content: "2025 වසර සඳහා නව සිසුන් බඳවා ගැනීම සඳහා අයදුම්පත් දැන් විවෘතයි. අවසන් දිනය අප්‍රේල් 30 වන දිනයි.",
          createdDate: "2025-04-01T10:00:00"
        },
        {
          id: 4,
          title: "නව වෙබ් අඩවිය",
          content: "අපගේ නව වෙබ් අඩවිය දැන් ක්‍රියාත්මකයි. පැරණි ගිණුම් විස්තර භාවිතා කර පිවිසෙන්න.",
          createdDate: "2025-03-28T08:45:00"
        },
        {
          id: 5,
          title: "පුස්තකාල සේවා වෙනස්වීම",
          content: "ලබන සතියේ සිට පුස්තකාලය සවස 7 දක්වා විවෘතව තබා ඇත. සතිඅන්ත වලදී උදෑසන 9 සිට සවස 4 දක්වා විවෘතයි.",
          createdDate: "2025-03-25T11:20:00"
        }
      ];

      // Sort announcements by date (newest first)
      const sortedData = dummyAnnouncements.sort((a, b) =>
        new Date(b.createdDate) - new Date(a.createdDate)
      );
      
      setAnnouncements(sortedData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);

    // Original API call code preserved as a comment:
    /*
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
    */
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-300"></div>
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
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-amber-300 text-center" style={{ fontFamily: "TharuDigitalRun"}}>
        {'jeo.;a f;dr;=re'}
      </h2>
      {announcements.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No important announcements available at the moment.
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

export default Announcements;