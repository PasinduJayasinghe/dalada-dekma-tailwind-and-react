import React, { useState, useEffect } from "react";
import Grid from "../Grid";
import AnimationSequence from "../Animation/AnimationSequence";

function MedicalServices() {
  const [medicalServices, setMedicalServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading delay
    const loadingTimer = setTimeout(() => {
      // Dummy medical services data
      const dummyMedicalServices = [
        {
          id: 1,
          title: "හදිසි වෛද්‍ය සේවා - කන්ද උඩරට මහ රෝහල",
          content: "කන්ද උඩරට මහ රෝහලේ හදිසි අනතුරු ඒකකය දිනපතා පැය 24 පුරා විවෘතව පවතී. හෘද රෝග, අනතුරු සහ හදිසි තත්ත්ව සඳහා සේවාව ලබාගත හැක. සම්බන්ධතා අංකය: 0812222225",
          createdDate: "2025-04-09T08:00:00"
        },
        {
          id: 2,
          title: "නොමිලේ වෛද්‍ය කඳවුර - නුවර නගර මධ්‍යය",
          content: "විශේෂඥ වෛද්‍යවරුන්ගේ සහභාගීත්වයෙන් අද (අප්‍රේල් 10) උදෑසන 9:00 සිට සවස 4:00 දක්වා නොමිලේ වෛද්‍ය කඳවුරක් පැවැත්වේ. රුධිර පීඩනය, දියවැඩියාව, නහර රෝග ඇතුළු සායනික පරීක්ෂණ සිදු කෙරේ.",
          createdDate: "2025-04-08T15:30:00"
        },
        {
          id: 3,
          title: "ඖෂධ බෙදා දීම - මංගල විද්‍යාලය",
          content: "අප්‍රේල් 11-12 දිනවල උදෑසන 10:00 සිට සවස 2:00 දක්වා මංගල විද්‍යාලයේදී පොදු රෝග සඳහා නොමිලේ ඖෂධ බෙදාදීමක් සිදු කෙරේ. ජාතික හැඳුනුම්පත රැගෙන එන්න.",
          createdDate: "2025-04-07T11:45:00"
        },
        {
          id: 4,
          title: "හදිසි ගිලන්රථ සේවාව",
          content: "හදිසි ගිලන්රථ සේවාව සඳහා 1990 අමතන්න. අලුත් අවුරුදු සමයේ අමතර ගිලන්රථ සේවා ස්ථානගත කර ඇත. පළමු ප්‍රතිකාර සේවාව ද ලබාගත හැක.",
          createdDate: "2025-04-06T14:20:00"
        },
        {
          id: 5,
          title: "නිල් මල වෛද්‍ය මධ්‍යස්ථානය - විශේෂ සේවා",
          content: "අලුත් අවුරුදු සමය හේතුවෙන් නිල් මල වෛද්‍ය මධ්‍යස්ථානය අප්‍රේල් 10-15 දිනවල පැය 24 පුරා විවෘතව තැබේ. අමතර වෛද්‍ය කාර්ය මණ්ඩලය සේවයේ යොදවා ඇත. දුරකථන අංකය: 0812456789",
          createdDate: "2025-04-05T09:30:00"
        }
      ];

      // Sort medical services by date (newest first)
      const sortedData = dummyMedicalServices.sort((a, b) =>
        new Date(b.createdDate) - new Date(a.createdDate)
      );
      
      setMedicalServices(sortedData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);

    /* Original API call code preserved as a comment:
    const fetchMedicalServices = async () => {
      try {
        const response = await fetch('https://localhost:7249/api/Notices/category/4');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Sort services by date (newest first)
        const sortedData = data.sort((a, b) =>
          new Date(b.createdDate) - new Date(a.createdDate)
        );
        setMedicalServices(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedicalServices();

    // Optional: Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchMedicalServices, 300000);
    return () => clearInterval(interval);
    */
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-300"></div>
        <span className="ml-4">Loading medical services...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading medical services: {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-4xl font-semibold mb-4 border-b pb-2 border-amber-300 text-center" style={{ fontFamily: "FMBindumathi"}}>
        {'yosis ffjoH fiajd'}
        {/* හදිසි වෛද්‍ය සේවා */}
      </h2>
      {medicalServices.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No emergency medical services available at the moment.
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
          {medicalServices.map((service) => (
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

export default MedicalServices;