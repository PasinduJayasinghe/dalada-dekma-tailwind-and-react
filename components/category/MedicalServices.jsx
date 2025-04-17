import React, { useState, useEffect } from "react";
import Grid from "../Grid";
import AnimationSequence from "../Animation/AnimationSequence";

function MedicalServices() {
  const [medicalServices, setMedicalServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let loadingTimer;
    let fetchInterval;

    // Original API call code preserved as a comment:
    const fetchMedicalServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notices/category/6');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Sort services by date (newest first)
        const sortedData = data.sort((a, b) =>
          new Date(b.createdDate) - new Date(a.createdDate)
        );
        setMedicalServices(sortedData);
        setError(null); // Clear any previous error
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate loading time
    loadingTimer = setTimeout(() => {
      fetchMedicalServices();
      fetchInterval = setInterval(() => {
        fetchMedicalServices();
      }, 300000); // Fetch every 5 minutes
    }
    , 1000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(fetchInterval);
    }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <Grid key={service.id}>
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