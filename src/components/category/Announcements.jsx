import React from "react";
import Grid from "../Grid";

function Announcements() {
  // Store announcements data in an array
  const announcements = [
    {
      timestamp: "March 28, 2024 - 9:00 AM",
      title: "ඇතුල්වීමේ ලිපිගොනු",
      content: "කරුණාකර ඔබගේ හැඳුනුම්පත රැගෙන පිවිසුමේ ආරක්ෂක ප්‍රොටෝකෝල අනුගමනය කරන්න."
    },
    {
      timestamp: "March 28, 2024 - 8:30 AM",
      title: "කාලගුණ උපදේශනය",
      content: "වැසි ඇති විය හැකි බැවින් රැගෙන ඒමට කාරුණික වන්න."
    },
    {
      timestamp: "March 28, 2024 - 9:00 AM",
      title: "ඇතුල්වීමේ ලිපිගොනු",
      content: "කරුණාකර ඔබගේ හැඳුනුම්පත රැගෙන පිවිසුමේ ආරක්ෂක ප්‍රොටෝකෝල අනුගමනය කරන්න."
    },
    {
      timestamp: "March 28, 2024 - 9:00 AM",
      title: "ඇතුල්වීමේ ලිපිගොනු",
      content: "කරුණාකර ඔබගේ හැඳුනුම්පත රැගෙන පිවිසුමේ ආරක්ෂක ප්‍රොටෝකෝල අනුගමනය කරන්න."
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-300 text-center">
        වැදගත් තොරතුරු
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {announcements.map((announcement, index) => (
          <Grid key={index} timestamp={announcement.timestamp}>
            <div>
              <h3 className="text-lg font-bold mb-2">{announcement.title}</h3>
              <p>{announcement.content}</p>
            </div>
          </Grid>
        ))}
      </div>
    </div>
  );
}

export default Announcements;