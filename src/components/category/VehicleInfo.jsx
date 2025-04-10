import React, { useState, useEffect } from "react";
import Grid from "../Grid";
import AnimationSequence from "../Animation/AnimationSequence";

function VehicleInfo() {
  const [vehicleInfo, setVehicleInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading delay
    const loadingTimer = setTimeout(() => {
      // Dummy vehicle information data
      const dummyVehicleInfo = [
        {
          id: 1,
          title: "අලුත් අවුරුදු සමයේ රථවාහන සීමා",
          content: "අප්‍රේල් 12-14 දිනවල නගර මධ්‍යයේ මෝටර් රථ ගමනාගමනය සීමා කර ඇත. පොදු ප්‍රවාහන සේවා භාවිතා කරන ලෙස ඉල්ලා සිටිමු. විශේෂ බස් රථ සේවා ක්‍රියාත්මක වේ.",
          createdDate: "2025-04-10T09:30:00"
        },
        {
          id: 2,
          title: "නොමිලේ වාහන නවතා තැබීමේ පහසුකම්",
          content: "අලුත් අවුරුදු සමය නිමිත්තෙන් මහනුවර වෙළඳ සංකීර්ණය අසල, බෝගම්බර ක්‍රීඩාංගණය සහ කන්ද උඩරට මහ රෝහල අසල ප්‍රදේශවල නොමිලේ වාහන නවතා තැබීමේ පහසුකම් ලබා දී ඇත.",
          createdDate: "2025-04-09T14:45:00"
        },
        {
          id: 3,
          title: "විකල්ප මාර්ග - දළදා මාළිගාව ප්‍රදේශය",
          content: "දළදා මාළිගාව ප්‍රදේශයට යාමට පහත විකල්ප මාර්ග භාවිතා කරන්න:\n1. කටුගස්තොට පාර හරහා\n2. අස්ගිරිය පාර හරහා\n3. මහනුවර-කන්දි මාර්ගය හරහා\nගමන් කිරීමට පෙර මාර්ග තත්ත්වය පරීක්ෂා කරන්න.",
          createdDate: "2025-04-08T11:20:00"
        },
        {
          id: 4,
          title: "රාත්‍රී නැවතුම් තහනම",
          content: "අප්‍රේල් 10-15 දිනවල රාත්‍රී 8:00 සිට උදෑසන 6:00 දක්වා පහත ප්‍රධාන මාර්ගවල වාහන නවතා තැබීම තහනම් කර ඇත:\n- ඩී.එස්. සේනානායක මාවත\n- කැන්දි පාර\n- දළදා වීදිය\n- ටී.බී. ජයා මාවත",
          createdDate: "2025-04-07T16:30:00"
        },
        {
          id: 5,
          title: "ආබාධිත පුද්ගලයින් සඳහා වාහන නැවතුම්",
          content: "ආබාධිත පුද්ගලයින් සඳහා වාහන නැවතුම් පහසුකම් පහත ස්ථානවල ලබා දී ඇත:\n- දළදා මාළිගාව පිවිසුම අසල\n- ජාතික කෞතුකාගාරය අසල\n- මහනුවර නගර සභාව ඉදිරිපිට\nකරුණාකර නිසි ආබාධිත හැඳුනුම්පත් ප්‍රදර්ශනය කරන්න.",
          createdDate: "2025-04-06T09:15:00"
        }
      ];

      // Sort vehicle info by date (newest first)
      const sortedData = dummyVehicleInfo.sort((a, b) =>
        new Date(b.createdDate) - new Date(a.createdDate)
      );
      
      setVehicleInfo(sortedData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);

    /* Original API call code preserved as a comment:
    const fetchVehicleInfo = async () => {
      try {
        const response = await fetch('https://localhost:7249/api/Notices/category/7');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Sort info by date (newest first)
        const sortedData = data.sort((a, b) =>
          new Date(b.createdDate) - new Date(a.createdDate)
        );
        setVehicleInfo(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicleInfo();

    // Optional: Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchVehicleInfo, 300000);
    return () => clearInterval(interval);
    */
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-300"></div>
        <span className="ml-4">Loading vehicle information...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading vehicle information: {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-4xl font-semibold mb-4 border-b pb-2 border-amber-300 text-center" style={{ fontFamily: "IskolaPotha"}}>
        {/* {'jdyk f;dr;=re yd jdyk k;r lsÍï'} */}
        ගිනි ආරක්ෂක
      </h2>
      {vehicleInfo.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No vehicle information available at the moment.
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
          {vehicleInfo.map((info) => (
            <Grid key={info.id} timestamp={info.createdDate}>
              <div style={{ fontFamily : "NotoSansSinhala" }}>
                <h3 className="text-lg font-bold mb-2">{info.title}</h3>
                <p className="whitespace-pre-line">{info.content}</p>
              </div>
            </Grid>
          ))}
          </AnimationSequence>
        </div>
      )}
    </div>
  );
}

export default VehicleInfo;