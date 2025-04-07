import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('announcements');
  const [notices, setNotices] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: 1, // Default to first category
  });

  // Map of category IDs to category names
  const categoryMap = {
    1: "Important Notices",
    2: "Traffic Updates",
    3: "Important Locations",
    5:"New Updates"
  };

  // Fetch data based on active section
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        switch(activeSection) {
          case 'announcements':
            const noticesRes = await fetch('https://localhost:7249/api/Notices/category/2');
            const noticesData = await noticesRes.json();
            setNotices(noticesData);
            break;
          case 'notifications':
            const notifsRes = await fetch('https://your-api-url/api/notifications');
            const notifsData = await notifsRes.json();
            setNotifications(notifsData);
            break;
          case 'subscribers':
            const subsRes = await fetch('https://your-api-url/api/subscribers');
            const subsData = await subsRes.json();
            setSubscribers(subsData);
            break;
          default:
            break;
        }
      } catch (err) {
        setError('Failed to fetch data');
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
          // Get the current date in a formatted string (yyyy-MM-dd)
          const currentDate = new Date().toISOString().split('T')[0];
          
          body = {
            title: formData.title,
            content: formData.content,
            categoryId: Number(formData.categoryId),
            categoryName: categoryMap[formData.categoryId], // Add CategoryName
            formattedDate: currentDate // Add FormattedDate
          };
          console.log('Sending request to:', `https://localhost:7249/api/${endpoint}`);
          console.log('Request body:', body);
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

      const response = await fetch(`https://localhost:7249/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server response:', errorData);
        throw new Error(`Failed to save: ${response.status} ${response.statusText}`);
      }

      // Refresh data
      setFormData({
        title: '',
        content: '',
        categoryId: 1
      });
      
      // Trigger data refetch
      const newData = await response.json();
      if (activeSection === 'announcements') {
        setNotices(prev => [...prev, newData]);
      } else if (activeSection === 'notifications') {
        setNotifications(prev => [...prev, newData]);
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
      const response = await fetch(`https://localhost:7249/api/${type}/${id}`, {
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
      } else if (type === 'subscribers') {
        setSubscribers(prev => prev.filter(item => item.id !== id));
      }
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
      return <div className="text-center py-8">Loading...</div>;
    }

    if (error) {
      return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>;
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
                    >
                      <option value="1">Important Notices</option>
                      <option value="2">Traffic Updates</option>
                      <option value="3">Important Locations</option>
                      <option value="5">New Updates</option>
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
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {notifications.map(notification => (
                    <tr key={notification.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{notification.id}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{notification.content}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                        <button 
                          className="text-red-600 hover:text-red-900"
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
                  {subscribers.map(subscriber => (
                    <tr key={subscriber.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{subscriber.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{subscriber.phoneNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(subscriber.subscriptionDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">View Details</button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(subscriber.id, 'subscribers')}
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
        </aside>
        
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;