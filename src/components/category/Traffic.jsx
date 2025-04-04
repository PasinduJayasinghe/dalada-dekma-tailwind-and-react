import React from "react";
import Grid from "../Grid";

function Traffic() {
  // Store traffic data in an array
  const trafficUpdates = [
    {
      timestamp: "March 28, 2024 - 8:00 AM",
      title: "මාර්ග වසා දැමීම්",
      content: "ශ්‍රී දළදා මාලිගාවට පිවිසෙන ප්‍රධාන මාර්ග උදෑසන 6:00 සිට රාත්‍රී 8:00 දක්වා වසා තැබේ."
    },
    {
      timestamp: "March 28, 2024 - 8:00 AM",
      title: "මාර්ග වසා දැමීම්",
      content: "ශ්‍රී දළදා මාලිගාවට පිවිසෙන ප්‍රධාන මාර්ග උදෑසන 6:00 සිට රාත්‍රී 8:00 දක්වා වසා තැබේ."
    },
    {
      timestamp: "March 28, 2024 - 8:00 AM",
      title: "මාර්ග වසා දැමීම්",
      content: "ශ්‍රී දළදා මාලිගාවට පිවිසෙන ප්‍රධාන මාර්ග උදෑසන 6:00 සිට රාත්‍රී 8:00 දක්වා වසා තැබේ."
    },
    {
      timestamp: "March 28, 2024 - 8:00 AM",
      title: "මාර්ග වසා දැමීම්",
      content: "ශ්‍රී දළදා මාලිගාවට පිවිසෙන ප්‍රධාන මාර්ග උදෑසන 6:00 සිට රාත්‍රී 8:00 දක්වා වසා තැබේ."
    },
    {
      timestamp: "March 28, 2024 - 8:00 AM",
      title: "මාර්ග වසා දැමීම්",
      content: "ශ්‍රී දළදා මාලිගාවට පිවිසෙන ප්‍රධාන මාර්ග උදෑසන 6:00 සිට රාත්‍රී 8:00 දක්වා වසා තැබේ."
    },
    {
      timestamp: "March 28, 2024 - 7:30 AM",
      title: "වාහන නැවැත්වීම්",
      content: "කැන්ඩි ලේක් වීව් වාහන නැවැත්වීමේ ස්ථානයේ සහ නගර මධ්‍යයේ වාහන නැවැත්වීමේ ස්ථානයේ නම් කරන ලද වාහන නැවැත්වීමේ ප්‍රදේශ තිබේ."
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-300 text-center">
        රථ වාහන තදබදය පිලිබද තොරතුරු
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {trafficUpdates.map((update, index) => (
          <Grid key={index} timestamp={update.timestamp}>
            <div>
              <h3 className="text-lg font-bold mb-2">{update.title}</h3>
              <p>{update.content}</p>
            </div>
          </Grid>
        ))}
      </div>
    </div>
  );
}

export default Traffic;