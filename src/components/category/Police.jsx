import React, { useState, useEffect } from "react";
import Grid from "../Grid";
import AnimationSequence from "../Animation/AnimationSequence";

function SanitaryFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading delay
    const loadingTimer = setTimeout(() => {
      // Dummy sanitary facilities data
      const dummyFacilities = [
        {
          id: 1,
          title: "දළදා වත්ත පොදු වැසිකිළි",
          content: "දළදා මාළිගාව අසල දළදා වත්ත ප්‍රදේශයේ පොදු වැසිකිළි පහසුකම් 24 පැය පුරා විවෘතව පවතී. දිනපතා පිරිසිදු කරනු ලැබේ.",
          createdDate: "2025-04-09T09:15:00"
        },
        {
          id: 2,
          title: "මහනුවර බස් නැවතුම්පොළ සනීපාරක්ෂක පහසුකම්",
          content: "මහනුවර ප්‍රධාන බස් නැවතුම්පොළ සනීපාරක්ෂක පහසුකම් උදෑසන 5:00 සිට රාත්‍රී 11:00 දක්වා විවෘතව ඇත. රු.20 ගාස්තුවක් අය කෙරේ.",
          createdDate: "2025-04-08T14:30:00"
        },
        {
          id: 3,
          title: "කූල්ස් සුපිරි වෙළඳසැල සනීපාරක්ෂක පහසුකම්",
          content: "කූල්ස් සුපිරි වෙළඳසැල තුළ අඩු ආබාධිත පුද්ගලයින්ට ප්‍රවේශ විය හැකි සනීපාරක්ෂක පහසුකම් ඇත. වෙළඳසැල විවෘත වේලාවන් තුළ පමණක් භාවිතා කළ හැක.",
          createdDate: "2025-04-07T11:45:00"
        },
        {
          id: 4,
          title: "ජාතික කෞතුකාගාරය අසල",
          content: "ජාතික කෞතුකාගාරය අසල පිහිටි පොදු වැසිකිළි පහසුකම් උදෑසන 8:00 සිට සවස 6:00 දක්වා විවෘතව ඇත. ළමා වැසිකිළි සහ ළදරු ඔතනය සඳහා විශේෂ පහසුකම් ඇත.",
          createdDate: "2025-04-06T16:00:00"
        },
        {
          id: 5,
          title: "කැන්දි උයන ප්‍රදේශය",
          content: "කැන්දි උයන ප්‍රදේශයේ නවීකරණය කරන ලද සනීපාරක්ෂක පහසුකම් දැන් විවෘතව ඇත. ආබාධිත පුද්ගලයින්ට පහසුවෙන් ප්‍රවේශ විය හැක.",
          createdDate: "2025-04-05T10:20:00"
        }
      ];

      // Sort sanitary facilities by date (newest first)
      const sortedData = dummyFacilities.sort((a, b) =>
        new Date(b.createdDate) - new Date(a.createdDate)
      );
      
      setFacilities(sortedData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);

    /* Original API call code preserved as a comment:
    const fetchFacilities = async () => {
      try {
        const response = await fetch('https://localhost:7249/api/Notices/category/3');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Sort facilities by date (newest first)
        const sortedData = data.sort((a, b) =>
          new Date(b.createdDate) - new Date(a.createdDate)
        );
        setFacilities(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFacilities();

    // Optional: Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchFacilities, 300000);
    return () => clearInterval(interval);
    */
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-300"></div>
        <span className="ml-4">Loading sanitary facilities...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading sanitary facilities: {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-4xl font-semibold mb-4 border-b pb-2 border-amber-300 text-center" style={{ fontFamily: "FMBindumathi"}}>
        {'fmd,sia ksfõok'}
        {/* පොලිස් නිවේදන */}
      </h2>
      {facilities.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No sanitary facilities information available at the moment.
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
          {facilities.map((facility) => (
            <Grid key={facility.id} timestamp={facility.createdDate}>
              <div style={{ fontFamily : "NotoSansSinhala" }}>
                <h3 className="text-lg font-bold mb-2">{facility.title}</h3>
                <p className="whitespace-pre-line">{facility.content}</p>
              </div>
            </Grid>
          ))}
          </AnimationSequence>
        </div>
      )}
    </div>
  );
}

export default SanitaryFacilities;