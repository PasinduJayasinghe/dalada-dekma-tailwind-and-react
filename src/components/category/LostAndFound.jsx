import React, { useState, useEffect } from "react";
import Grid from "../Grid";
import AnimationSequence from "../Animation/AnimationSequence";

function LostAndFound() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading delay
    const loadingTimer = setTimeout(() => {
      // Dummy lost and found items data
      const dummyItems = [
        {
          id: 1,
          title: "සොයාගත් - කළු පාට ගුවන් ගමන් බෑගය",
          content: "කළු පාට American Tourister ගුවන් ගමන් බෑගයක් දළදා මාළිගාව අසලදී සොයාගන්නා ලදී. හිමිකරු තම අනන්‍යතාවය තහවුරු කරමින් මහනුවර පොලිස් ස්ථානයෙන් ලබාගත හැක. විමසීම්: 0812222999",
          createdDate: "2025-04-09T16:30:00"
        },
        {
          id: 2,
          title: "අහිමි වූ - iPhone 17 Pro දුරකථනය",
          content: "අප්‍රේල් 9 වන දින සවස් කාලයේ මහනුවර නගර මධ්‍යයේදී තද නිල් පාට කවරයක් සහිත iPhone 17 Pro දුරකථනයක් අහිමි විය. සොයා දෙන අයට තිළිණයක් ඇත. සම්බන්ධ වන්න: 0771234567",
          createdDate: "2025-04-09T12:45:00"
        },
        {
          id: 3,
          title: "සොයාගත් - රන් පාට කරාබු කුට්ටමක්",
          content: "අප්‍රේල් 8 වන දින බොගම්බර වැව අසල රන් පාට කරාබු කුට්ටමක් සොයාගන්නා ලදී. හිමිකරු කරාබු විස්තර සමඟ බොගම්බර පොලිස් ස්ථානය අමතන්න. දුරකථන අංකය: 0812345678",
          createdDate: "2025-04-08T17:20:00"
        },
        {
          id: 4,
          title: "අහිමි වූ - පාසල් බෑගය සහ පෙළපොත්",
          content: "අප්‍රේල් 8 වන දින උදෑසන 10:00ට පමණ මහනුවර බස් නැවතුම්පොළ අසලදී තද කොළ පාට Adidas පාසල් බෑගයක් සහ 6 ශ්‍රේණියේ පෙළපොත් අහිමි විය. සොයා දෙන්නේ නම් කරුණාකර අමතන්න: 0765432109",
          createdDate: "2025-04-08T11:30:00"
        },
        {
          id: 5,
          title: "සොයාගත් - Canon DSLR කැමරාව",
          content: "අප්‍රේල් 7 වන දින පේරාදෙණිය උද්භිද උද්‍යානය අසල Canon EOS R8 DSLR කැමරාවක් සොයාගන්නා ලදී. හිමිකරු කැමරාවේ මෙමරි කාඩ් එකේ ඇති ඡායාරූප පිළිබඳ විස්තර සපයා හඳුනාගත යුතුයි. විමසීම්: 0812987654",
          createdDate: "2025-04-07T15:10:00"
        }
      ];

      // Sort items by date (newest first)
      const sortedData = dummyItems.sort((a, b) =>
        new Date(b.createdDate) - new Date(a.createdDate)
      );
      
      setItems(sortedData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);

    /* Original API call code preserved as a comment:
    const fetchItems = async () => {
      try {
        const response = await fetch('https://localhost:7249/api/Notices/category/5');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Sort items by date (newest first)
        const sortedData = data.sort((a, b) =>
          new Date(b.createdDate) - new Date(a.createdDate)
        );
        setItems(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();

    // Optional: Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchItems, 300000);
    return () => clearInterval(interval);
    */
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-300"></div>
        <span className="ml-4">Loading lost and found items...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading lost and found items: {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-4xl font-semibold mb-4 border-b pb-2 border-amber-300 text-center" style={{ fontFamily: "FMBindumathi"}}>
        {'ke;sùï yd fidhd.ekSï'}
        {/* නැතිවීම් හා සොයාගැනීම් */}
      </h2>
      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No lost and found items available at the moment.
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
          {items.map((item) => (
            <Grid key={item.id} timestamp={item.createdDate}>
              <div style={{ fontFamily : "NotoSansSinhala" }}>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="whitespace-pre-line">{item.content}</p>
              </div>
            </Grid>
          ))}
          </AnimationSequence>
        </div>
      )}
    </div>
  );
}

export default LostAndFound;