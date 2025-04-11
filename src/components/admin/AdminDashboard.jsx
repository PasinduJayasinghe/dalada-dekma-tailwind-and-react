import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar.jsx";
import AnnouncementsSection from "./sections/AnnouncementsSection .jsx";
import NotificationsSection from "./sections/NotificationsSection .jsx";
import LocationsSection from "./sections/LocationsSection .jsx";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("announcements");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/admin/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem("adminToken");
          navigate("/admin");
          return;
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/admin");
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "announcements":
        return <AnnouncementsSection />;
      case "notifications":
        return <NotificationsSection />;
      case "locations":
        return <LocationsSection />;
      default:
        return <AnnouncementsSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader onLogout={handleLogout} />

      <div className="flex">
        <AdminSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <main className="flex-1 p-6">{renderActiveSection()}</main>
      </div>
    </div>
  );
}

export default AdminDashboard;
