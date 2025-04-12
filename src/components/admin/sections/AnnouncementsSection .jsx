import React, { useState, useEffect } from "react";
import DataTable from "../common/DataTable";
import AnnouncementForm from "../forms/AnnouncementForm";
import useApi from "../../hooks/useApi";
import { categories } from "../../constants/categories";

export default function AnnouncementsSection() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: "1" // Default to first category
  });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  
  const { data, isLoading, error, fetchData, postData, deleteData } = useApi("notices");

  useEffect(() => {
    fetchData();
  }, []);

  // Apply filtering when data or category selection changes
  useEffect(() => {
    if (!data) return;
    
    if (selectedCategory === "all") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => 
        item.categoryId === parseInt(selectedCategory) || 
        item.category_id === parseInt(selectedCategory)
      );
      setFilteredData(filtered);
    }
  }, [data, selectedCategory]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title: formData.title,
      content: formData.content,
      categoryId: Number(formData.categoryId),
      categoryName: categories[formData.categoryId]
    };
    
    await postData(body);
    setFormData({ title: "", content: "", categoryId: "1" });
  };

  const columns = [
    { 
      header: "Title", 
      accessor: "title",
      className: "font-medium" 
    },
    { 
      header: "Content", 
      accessor: "content", 
      className: "max-w-xs truncate" 
    },
    { 
      header: "Category", 
      accessor: (item) => item.categoryName || categories[item.categoryId] || categories[item.category_id] || "Uncategorized",
      className: "capitalize"
    },
    { 
      header: "Date", 
      accessor: "formattedDate",
      className: "whitespace-nowrap"
    },
    {
      header: "Actions",
      accessor: (item) => (
        <button
          onClick={() => deleteData(item.id)}
          className="text-red-600 hover:text-red-900 px-3 py-1 border border-red-600 rounded transition-colors"
        >
          Delete
        </button>
      ),
      className: "text-right"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Manage Announcements</h2>
        
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
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Add New Announcement</h3>
        <AnnouncementForm 
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
          emptyMessage="No announcements found matching your criteria"
        />
      </div>
    </div>
  );
}