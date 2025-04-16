import React, { useState, useEffect } from "react";
import DataTable from "../common/DataTable";
import LocationForm from "../forms/LocationForm";
import useApi from "../../hooks/useApi";
import { categories } from "../../constants/categories";

export default function LocationsSection() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    lat: "",
    lng: "",
    contact: "",
    hours: "",
    capacity: "",
    fee: "",
    categoryId: "1"
  });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const { data, isLoading, error, fetchData, postData, deleteData } = useApi("locations");

  useEffect(() => {
    fetchData();
  }, []);

  // Apply category filter when data or selected category changes
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => item.category_id === parseInt(selectedCategory));
      setFilteredData(filtered);
    }
  }, [data, selectedCategory]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const updateLostPersonStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/locations/lost-persons/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error("Failed to update status");
      
      // Refresh data after update
      fetchData();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name: formData.name,
      description: formData.description,
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng),
      contact: formData.contact,
      hours: formData.hours,
      capacity: formData.capacity,
      fee: formData.fee,
      category_id: Number(formData.categoryId)
    };
    
    await postData(body);
    setFormData({
      name: "",
      description: "",
      lat: "",
      lng: "",
      contact: "",
      hours: "",
      capacity: "",
      fee: "",
      categoryId: "1"
    });
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { 
      header: "Category", 
      accessor: (item) => categories[item.category_id] || "Unknown"
    },
    { 
      header: "Coordinates", 
      accessor: (item) => `${item.lat}, ${item.lng}` 
    },
    { header: "Contact", accessor: "contact" },
    {
      header: "Actions",
      accessor: (item) => (
        <div className="flex space-x-2">
          <button
            onClick={() => deleteData(item.id)}
            className="text-red-600 hover:text-red-900 px-3 py-1 border border-red-600 rounded transition-colors"
          >
            Delete
          </button>
          
          {item.category_id === 7 && (
            <button 
              onClick={() => updateLostPersonStatus(item.id, item.status === 'Found' ? 'Not Found' : 'Found')}
              className={`px-3 py-1 rounded transition-colors ${
                item.status === 'Found' 
                  ? 'bg-green-100 text-green-800 border border-green-600 hover:bg-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-600 hover:bg-red-200'
              }`}
            >
              {item.status === 'Found' ? 'Found' : 'Not Found'}
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Manage Locations</h2>
        
        {/* Category Filter Dropdown */}
        <div className="flex items-center space-x-2">
          <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">
            Filter by:
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
          >
            <option value="all">All Categories</option>
            {Object.entries(categories).map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Add New Location</h3>
        <LocationForm 
          formData={formData} 
          onChange={handleFormChange} 
          onSubmit={handleSubmit} 
          isLoading={isLoading}
          categories={categories}
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <DataTable 
          data={filteredData} 
          columns={columns} 
          isLoading={isLoading} 
          error={error}
          emptyMessage="No locations found matching your criteria"
        />
      </div>
    </div>
  );
}