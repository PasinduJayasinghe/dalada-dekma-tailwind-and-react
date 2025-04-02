import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('announcements');
  const navigate = useNavigate();
  
  // Sample data
  const announcementData = [
    { id: 1, title: 'Entry Requirements', content: 'Please bring your ID and follow the security protocols at the entrance.', date: 'March 28, 2024 - 9:00 AM', category: 'Important Notices' },
    { id: 2, title: 'Weather Advisory', content: 'Umbrellas and rain protection recommended due to possible light showers.', date: 'March 28, 2024 - 8:30 AM', category: 'Important Notices' }
  ];
  
  const trafficData = [
    { id: 1, title: 'Road Closures', content: 'Main roads leading to Sri Dalada Maligawa will be closed from 6:00 AM to 8:00 PM.', date: 'March 28, 2024 - 8:00 AM', category: 'Traffic Updates' },
    { id: 2, title: 'Parking Information', content: 'Designated parking areas available at Kandy Lake View Parking and City Center Parking.', date: 'March 28, 2024 - 7:30 AM', category: 'Traffic Updates' }
  ];
  
  const locationData = [
    { id: 1, title: 'Main Entrance', content: 'Located at Sri Dalada Maligawa main gate. Please arrive 30 minutes before your scheduled time.', date: 'March 28, 2024 - 10:00 AM', category: 'Important Locations' },
    { id: 2, title: 'Information Center', content: 'Visit our information center near the main entrance for any assistance.', date: 'March 28, 2024 - 9:30 AM', category: 'Important Locations' }
  ];
  
  const notificationData = [
    { id: 1, content: 'CHECK OUT THE NEW LIBRARY SPACES' },
    { id: 2, content: 'EXTENDED HOURS DURING EXAM WEEK' },
    { id: 3, content: 'NEW ONLINE RESOURCES AVAILABLE' }
  ];
  
  const subscriberData = [
    { id: 1, name: 'John Doe', phone: '123-456-7890', date: 'March 25, 2024' },
    { id: 2, name: 'Jane Smith', phone: '234-567-8901', date: 'March 26, 2024' },
    { id: 3, name: 'Robert Johnson', phone: '345-678-9012', date: 'March 27, 2024' }
  ];
  
  // Form state for editing/adding items
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Important Notices',
    date: ''
  });
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! In a real application, this would save to the database.');
    // Reset form
    setFormData({
      title: '',
      content: '',
      category: 'Important Notices',
      date: ''
    });
  };

  // Handle logout functionality
  const handleLogout = () => {
    navigate('/');
  };
  
  // Render the appropriate content based on active section
  const renderContent = () => {
    switch(activeSection) {
      case 'announcements':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Announcements</h2>
            <div className="mb-6 bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">Add/Edit Announcement</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="Important Notices">Important Notices</option>
                      <option value="Traffic Updates">Traffic Updates</option>
                      <option value="Important Locations">Important Locations</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded h-24"
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="mt-4">
                  <button 
                    type="submit" 
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Save Announcement
                  </button>
                </div>
              </form>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...announcementData, ...trafficData, ...locationData].map(item => (
                    <tr key={`${item.category}-${item.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">{item.content}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Notification Bar</h2>
            <div className="mb-6 bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">Add New Notification</h3>
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notification Text</label>
                  <input
                    type="text"
                    name="content"
                    value={formData.content}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mt-4">
                  <button 
                    type="submit" 
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add Notification
                  </button>
                </div>
              </form>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {notificationData.map(item => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{item.content}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      case 'subscribers':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Subscribers</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Subscribed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subscriberData.map(item => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">View Details</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#1a2332] text-white py-4 px-6 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div>
            <span className="mr-4">Welcome, Admin</span>
            <button 
              className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1a2332] min-h-screen text-white p-4">
          <nav>
            <ul>
              <li className="mb-2">
                <button 
                  onClick={() => setActiveSection('announcements')}
                  className={`w-full text-left py-2 px-4 rounded ${activeSection === 'announcements' 
                    ? 'bg-blue-600 font-medium' 
                    : 'hover:bg-gray-700'}`}
                >
                  Manage Announcements
                </button>
              </li>
              <li className="mb-2">
                <button 
                  onClick={() => setActiveSection('notifications')}
                  className={`w-full text-left py-2 px-4 rounded ${activeSection === 'notifications' 
                    ? 'bg-blue-600 font-medium' 
                    : 'hover:bg-gray-700'}`}
                >
                  Notification Bar
                </button>
              </li>
              <li className="mb-2">
                <button 
                  onClick={() => setActiveSection('subscribers')}
                  className={`w-full text-left py-2 px-4 rounded ${activeSection === 'subscribers' 
                    ? 'bg-blue-600 font-medium' 
                    : 'hover:bg-gray-700'}`}
                >
                  Subscribers
                </button>
              </li>
            </ul>
          </nav>
          
          <div className="mt-auto pt-10">
            <div className="border-t border-gray-700 pt-4">
              <p className="text-sm text-gray-400">© 2025 Bitzify</p>
              <p className="text-sm text-gray-400">All rights reserved.</p>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;