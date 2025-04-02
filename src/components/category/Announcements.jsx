import React from "react";
import Grid from "../Grid";

function Announcements() {
  return (
    <div>
   <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-300 text-center">වැදගත් තොරතුරු</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
     <Grid timestamp="March 28, 2024 - 9:00 AM">
        <div>
          <h3 className="text-lg font-bold mb-2">ඇතුල්වීමේ ලිපිගොනු</h3>
          <p>කරුණාකර ඔබගේ හැඳුනුම්පත රැගෙන පිවිසුමේ ආරක්ෂක ප්‍රොටෝකෝල අනුගමනය කරන්න.</p>
        </div>
      </Grid>
      
      <Grid timestamp="March 28, 2024 - 8:30 AM">
        <div>
          <h3 className="text-lg font-bold mb-2">කාලගුණ උපදේශනය</h3>
          <p>වැසි ඇති විය හැකි බැවින් රැගෙන ඒමට කාරුණික වන්න.</p>
        </div>
      </Grid>
      <Grid timestamp="March 28, 2024 - 9:00 AM">
        <div>
          <h3 className="text-lg font-bold mb-2">ඇතුල්වීමේ ලිපිගොනු</h3>
          <p>කරුණාකර ඔබගේ හැඳුනුම්පත රැගෙන පිවිසුමේ ආරක්ෂක ප්‍රොටෝකෝල අනුගමනය කරන්න.</p>
        </div>
      </Grid>
      <Grid timestamp="March 28, 2024 - 9:00 AM">
        <div>
          <h3 className="text-lg font-bold mb-2">ඇතුල්වීමේ ලිපිගොනු</h3>
          <p>කරුණාකර ඔබගේ හැඳුනුම්පත රැගෙන පිවිසුමේ ආරක්ෂක ප්‍රොටෝකෝල අනුගමනය කරන්න.</p>
        </div>
      </Grid>
      <Grid timestamp="March 28, 2024 - 9:00 AM">
        <div>
          <h3 className="text-lg font-bold mb-2">ඇතුල්වීමේ ලිපිගොනු</h3>
          <p>කරුණාකර ඔබගේ හැඳුනුම්පත රැගෙන පිවිසුමේ ආරක්ෂක ප්‍රොටෝකෝල අනුගමනය කරන්න.</p>
        </div>
      </Grid>
      <Grid timestamp="March 28, 2024 - 9:00 AM">
        <div>
          <h3 className="text-lg font-bold mb-2">ඇතුල්වීමේ ලිපිගොනු</h3>
          <p>කරුණාකර ඔබගේ හැඳුනුම්පත රැගෙන පිවිසුමේ ආරක්ෂක ප්‍රොටෝකෝල අනුගමනය කරන්න.</p>
        </div>
      </Grid>
      
    </div>
    </div>
  );
}

export default Announcements;