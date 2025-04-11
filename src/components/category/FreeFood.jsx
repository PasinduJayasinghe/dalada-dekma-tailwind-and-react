import React, { useState, useEffect } from "react";
import Grid from "../Grid";
import AnimationSequence from "../Animation/AnimationSequence";

function FreeFood() {
  const [foodServices, setFoodServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading delay
    const loadingTimer = setTimeout(() => {
      // Dummy free food services data
      const dummyFoodServices = [
        {
          id: 1,
          title: "දළදා මාළිගාව අසල දාන ශාලාව",
          content: "උදෑසන 7:00 සිට සවස 2:00 දක්වා දහවල් ආහාර නොමිලේ බෙදා දෙනු ලැබේ. බත්, පරිප්පු, වියළි මාළු, පලතුරු ඇතුළු ආහාර වේල සපයනු ලැබේ.",
          createdDate: "2025-04-09T08:30:00"
        },
        {
          id: 2,
          title: "මහනුවර පොදු පුස්තකාලය අසල",
          content: "අලුත් අවුරුදු සමය නිමිත්තෙන් අප්‍රේල් 10-14 දිනවල උදෑසන 9:00 සිට නොමිලේ තේ හා බිස්කට් බෙදා දෙනු ලැබේ.",
          createdDate: "2025-04-08T10:45:00"
        },
        {
          id: 3,
          title: "කඩුගන්නාව සිරි සුමන පිරිවෙන",
          content: "සෑම සෙනසුරාදා දිනකම උදෑසන 10:00 සිට සවස 1:00 දක්වා දාන ශාලාව විවෘතව පවතී. සියලුම අමුත්තන්ට ස්වාගතයි.",
          createdDate: "2025-04-07T14:00:00"
        },
        {
          id: 4,
          title: "සිංහ සමාජ සේවා ව්‍යාපෘතිය",
          content: "අසරණ පුද්ගලයින් සඳහා දිනපතා රාත්‍රී 7:00 සිට 9:00 දක්වා මහනුවර නගර ශාලාව අසල ආහාර පැකට් සහ පානීය ජලය බෙදා දෙනු ලැබේ.",
          createdDate: "2025-04-06T16:20:00"
        },
        {
          id: 5,
          title: "සමගි ප්‍රජා දායකත්ව වැඩසටහන",
          content: "සෑම ඉරිදා දිනක උදෑසන 8:00 සිට 11:00 දක්වා අඩු ආදායම්ලාභි පවුල් සඳහා සතියක ආහාර සැපයුම් ලබා දීම සිදු කෙරේ. ලියාපදිංචි වීම සඳහා විහාරස්ථානයේ කාර්යාලය අමතන්න.",
          createdDate: "2025-04-05T09:30:00"
        }
      ];

      // Sort food services by date (newest first)
      const sortedData = dummyFoodServices.sort((a, b) =>
        new Date(b.createdDate) - new Date(a.createdDate)
      );
      
      setFoodServices(sortedData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);

    /* Original API call code preserved as a comment:
    const fetchFoodServices = async () => {
      try {
        const response = await fetch('https://localhost:7249/api/Notices/category/2');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Sort services by date (newest first)
        const sortedData = data.sort((a, b) =>
          new Date(b.createdDate) - new Date(a.createdDate)
        );
        setFoodServices(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoodServices();

    // Optional: Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchFoodServices, 300000);
    return () => clearInterval(interval);
    */
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-300"></div>
        <span className="ml-4">Loading free food services...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading free food services: {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-4xl font-semibold mb-4 border-b pb-2 border-amber-300 text-center" style={{ fontFamily: "FMBindumathi"}}>
        {'fkdñf,a wdydr'}
        {/* නොමිලේ ආහාර */}
      </h2>
      {foodServices.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No free food services available at the moment.
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
          {foodServices.map((service) => (
            <Grid key={service.id} timestamp={service.createdDate}>
              <div style={{ fontFamily : "NotoSansSinhala" }}>
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="whitespace-pre-line">{service.content}</p>
              </div>
            </Grid>
          ))}
          </AnimationSequence>
        </div>
      )}
    </div>
  );
}

export default FreeFood;