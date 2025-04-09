import { useState, useEffect } from 'react';  // Add this import at the top
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Component imports
import Notification from './components/Notification';
import Banner from './components/Header';
import CategoryContainer from './components/CategoryContainer';
import Footer from './components/Footer';
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from './components/admin/AdminDashboard';
import DaladaBufferEffect from './components/DaladaBufferEffect';

// Layout component for the main public site
const PublicLayout = () => {
  const [showBuffer, setShowBuffer] = useState(true);

  // Hide buffer effect after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBuffer(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showBuffer && <DaladaBufferEffect />}
      <Banner />
      <Notification interval={5000} />
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