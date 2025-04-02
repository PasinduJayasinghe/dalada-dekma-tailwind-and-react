import React, { useState, useEffect } from 'react';

function AdminLocationManagement() {
  // State for managing locations
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    latitude: '',
    longitude: '',
    category: 'Important Locations'
  });
  
  // Edit mode state
  const [editIndex, setEditIndex] = useState(null);
  
  // Mock data fetch - replace with actual API calls in production
  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      setLocations([
        {
          name: "Main Entrance",
          coordinates: [7.2906, 80.6337],
          timestamp: "March 28, 2024 - 10:00 AM",
          description: "Located at Sri Dalada Maligawa main gate. Please arrive 30 minutes before your scheduled time."
        },
        {
          name: "Information Center",
          coordinates: [7.2910, 80.6340],
          timestamp: "March 28, 2024 - 9:30 AM",
          description: "Visit our information center near the main entrance for any assistance."
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create timestamp
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })} - ${now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    })}`;
    
    const newLocation = {
      name: formData.name,
      description: formData.description,
      coordinates: [parseFloat(formData.latitude), parseFloat(formData.longitude)],
      timestamp: formattedDate
    };
    
    if (editIndex !== null) {
      // Update existing location
      const updatedLocations = [...locations];
      updatedLocations[editIndex] = newLocation;
      setLocations(updatedLocations);
      setEditIndex(null);
    } else {
      // Add new location
      setLocations([...locations, newLocation]);
    }
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      latitude: '',
      longitude: '',
      category: 'Important Locations'
    });
  };
  
  const handleEdit = (index) => {
    const location = locations[index];
    setFormData({
      name: location.name,
      description: location.description,
      latitude: location.coordinates[0].toString(),
      longitude: location.coordinates[1].toString(),
      category: 'Important Locations'
    });
    setEditIndex(index);
  };
  
  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      const updatedLocations = locations.filter((_, i) => i !== index);
      setLocations(updatedLocations);
    }
  };
  
  const handleCancel = () => {
    setFormData({
      name: '',
      description: '',
      latitude: '',
      longitude: '',
      category: 'Important Locations'
    });
    setEditIndex(null);
  };
  
  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Important Locations</h2>
      
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">
          {editIndex !== null ? 'Edit Location' : 'Add New Location'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
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
                <option value="Important Locations">Important Locations</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleFormChange}
                placeholder="e.g. 7.2906"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleFormChange}
                placeholder="e.g. 80.6337"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded h-24"
                required
              ></textarea>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editIndex !== null ? 'Update Location' : 'Save Location'}
            </button>
            {editIndex !== null && (
              <button 
                type="button" 
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coordinates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {locations.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No locations found. Add a new location to get started.
                </td>
              </tr>
            ) : (
              locations.map((location, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{location.name}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{location.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {location.coordinates[0].toFixed(4)}, {location.coordinates[1].toFixed(4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{location.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleEdit(index)} 
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(index)} 
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminLocationManagement;