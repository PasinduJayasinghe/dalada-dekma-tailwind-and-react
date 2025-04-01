import { useState } from 'react';
import './App.css';
import Notification from './components/Notification.jsx';
import Banner from './components/Banner.jsx';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryContainer from './components/CategoryContainer.jsx';
import Footer from './components/Footer.jsx';
import AdminLogin from "./components/admin/Admin.jsx"; // Import AdminLogin
import AdminDashboard from './components/admin/AdminDashboard.jsx'; // Import AdminDashboard

function App() {
  const notifications = [
    "CHECK OUT THE NEW LIBRARY SPACES",
    "EXTENDED HOURS DURING FINALS WEEK",
    "NEW RESOURCES AVAILABLE ONLINE"
  ];

  // You might want to conditionally render Banner/Notification
  // based on whether it's an admin route or not.
  // For simplicity now, they remain global.

  return (
    <Router>
      {/* These will render on ALL pages defined in Routes */}
      <Banner />
      <Notification messages={notifications} />

      <Routes>
        {/* Public Route */}
        <Route path="/" element={
          <>
            {/* Banner and Notification are already above */}
            <CategoryContainer />
            <Footer />
          </>
        } />

        {/* Admin Login Route */}
        {/* Note: Banner/Notification will show here too */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Admin Dashboard Route - ADD THIS ROUTE */}
        {/* Note: Banner/Notification will show here too by default */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>
    </Router>
    // Removed the extra outer div, Router should be the top-level element generally
  );
}

export default App;