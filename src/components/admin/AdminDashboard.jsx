import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('announcements');
  const [notices, setNotices] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: 6, // Default to first category
  });

  // Map of category IDs to category names
  const categoryMap = {
    1: "Announcement",
    2: "Locations",
    3: "Police",
    4: "Freefood",
    5: "Sanitary",
    6: "Medical",
    7: "Lostfound",
    8: "Vehicles",
    9: "Fire",
    10: "Water",
    11: "Worship",
    12: "Weather",
    13: "Infocenter"
  };
  

  // Fetch data based on active section
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        switch(activeSection) {
          case 'announcements':
            const noticesRes = await fetch('http://localhost:5000/api/notices/category/2');
            const noticesData = await noticesRes.json();
            setNotices(noticesData);
            break;
          case 'notifications':
            const notifsRes = await fetch('http://localhost:5000/api/notifications');
            const notifsData = await notifsRes.json();
            setNotifications(notifsData);
            break;
          default:
            break;
        }
      } catch (err) {
        setError('Failed to fetch data: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeSection]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      let endpoint = '';
      let body = {};
      
      switch(activeSection) {
        case 'announcements':
          endpoint = 'notices';
          const currentDate = new Date().toISOString().split('T')[0];
          
          body = {
            title: formData.title,
            content: formData.content,
            categoryId: Number(formData.categoryId),
            categoryName: categoryMap[formData.categoryId],
            formattedDate: currentDate
          };
          break;
        case 'notifications':
          endpoint = 'notifications';
          body = {
            content: formData.content,
            isActive: true
          };
          break;
        default:
          break;
      }

      const response = await fetch(`http://localhost:5000/api/${endpoint.toLowerCase()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to save: ${errorData}`);
      }

      // Reset form and refresh data
      setFormData({
        title: '',
        content: '',
        categoryId: 1
      });
      
      // Refetch data to update the list
      const refetchRes = await fetch(`http://localhost:5000/api/${endpoint.toLowerCase()}`);
      const newData = await refetchRes.json();
      
      if (activeSection === 'announcements') {
        setNotices(newData);
      } else if (activeSection === 'notifications') {
        setNotifications(newData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const endpoint = type === 'notices' ? 'notices' : 'notifications';
      const response = await fetch(`http://localhost:5000/api/${endpoint.toLowerCase()}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      // Update state
      if (type === 'notices') {
        setNotices(prev => prev.filter(item => item.id !== id));
      } else if (type === 'notifications') {
        setNotifications(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleNotificationStatus = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notifications/${id}/toggle`, {
        method: 'PATCH'
      });

      if (!response.ok) {
        throw new Error('Toggle failed');
      }

      // Update the specific notification's status
      setNotifications(prev => prev.map(notification => 
        notification.id === id 
          ? { ...notification, isActive: !notification.isActive } 
          : notification
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/');
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button 
            onClick={() => setError('')} 
            className="float-right font-bold"
          >
            &times;
          </button>
        </div>
      );
    }

    switch(activeSection) {
      case 'announcements':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Announcements</h2>
            <div className="mb-6 bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">Add Announcement</h3>
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
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    >
                      <option value="1">Announcement</option>
                      <option value="2">Locations</option>
                      <option value="3">Police</option>
                      <option value="4">Freefood</option>
                      <option value="5">Sanitary</option>
                      <option value="6">Medical</option>
                      <option value="7">Lostfound</option>
                      <option value="8">Vehicles</option>
                      <option value="9">Fire</option>
                      <option value="10">Water</option>
                      <option value="11">Worship</option>
                      <option value="12">Weather</option>
                      <option value="13">Infocenter</option>

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
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Announcement'}
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
                  {notices.map(notice => (
                    <tr key={notice.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{notice.title}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">{notice.content}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(notice.createdDate).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{notice.categoryName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(notice.id, 'notices')}
                        >
                          Delete
                        </button>
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
            <h2 className="text-xl font-bold mb-4">Manage Notifications</h2>
            <div className="mb-6 bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">Add New Notification</h3>
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notification Text</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded h-24"
                    required
                  ></textarea>
                </div>
                <div className="mt-4">
                  <button 
                    type="submit" 
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Adding...' : 'Add Notification'}
                  </button>
                </div>
              </form>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {notifications.map(notification => (
                    <tr key={notification.id}>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{notification.content}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span 
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            notification.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {notification.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(notification.createdDate).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button 
                          onClick={() => toggleNotificationStatus(notification.id)}
                          className={`px-3 py-1 rounded ${
                            notification.isActive
                              ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                        >
                          {notification.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900 px-3 py-1 border border-red-600 rounded hover:bg-red-50"
                          onClick={() => handleDelete(notification.id, 'notifications')}
                        >
                          Delete
                        </button>
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
      <header className="bg-[#1a2332] text-white py-4 px-6 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div>
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
                  Manage Notifications
                </button>
              </li>
            </ul>
          </nav>
        </aside>
        
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;