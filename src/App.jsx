import { useState } from 'react';
import './App.css';
import Notification from './components/Notification.jsx';
import Banner from './components/Banner.jsx';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryContainer from './components/CategoryContainer.jsx';
import Footer from './components/Footer.jsx';
import AdminLogin from "./components/admin/Admin.jsx"; 
import AdminDashboard from './components/admin/AdminDashboard.jsx';

// Layout component for the main public site
const PublicLayout = () => {
  const notifications = [
    "CHECK OUT THE NEW LIBRARY SPACES",
    "EXTENDED HOURS DURING FINALS WEEK",
    "NEW RESOURCES AVAILABLE ONLINE"
  ];

  return (
    <>
      <Banner />
      <Notification messages={notifications} />
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