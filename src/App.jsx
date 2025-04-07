import { useState, useEffect } from 'react';
import Notification from './components/Notification.jsx';
import Banner from './components/Header.jsx';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryContainer from './components/CategoryContainer.jsx';
import Footer from './components/Footer.jsx';
import AdminLogin from "./components/admin/AdminLogin.jsx";
import AdminDashboard from './components/admin/AdminDashboard.jsx';

// Layout component for the main public site
const PublicLayout = () => {
  const [databaseNotifications, setDatabaseNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Default hardcoded notifications
  const staticNotifications = [
    "වාහන නැවැත්වීම් මධ්‍ය්ස්ථානයේ ඉඩ පහසුකම් ඇත",
    "භාණ්ඩ පිලිබදව සුපරික්ෂාකාරී වන්න",
    "කසල නිසි ස්ථානවල බැහැර කිරීමට කාරුණික වන්න" 
  ];

  // Fetch notifications from the database
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('https://localhost:7249/api/Notifications');
        if (response.ok) {
          const data = await response.json();
          setDatabaseNotifications(data);
        } else {
          console.error('Failed to fetch notifications');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <>
      <Banner />
      {!isLoading && (
        <Notification 
          messages={staticNotifications} 
          databaseNotifications={databaseNotifications} 
        />
      )}
      <CategoryContainer />
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route with Banner and Notification */}
        <Route path="/" element={<PublicLayout />} />

        {/* Admin Routes - no Banner/Notification */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;