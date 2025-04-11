import React, { useState, useEffect } from "react";
import DataTable from "../common/DataTable";
import NotificationForm from "../forms/NotificationForm";
import useApi from "../../hooks/useApi";

export default function NotificationsSection() {
  const [formData, setFormData] = useState({ content: "" });
  const { data, isLoading, error, fetchData, postData, deleteData, patchData } = useApi("notifications");

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { content: formData.content, isActive: true };
    await postData(body);
    setFormData({ content: "" });
  };

  const toggleNotificationStatus = async (id) => {
    await patchData(`${id}/toggle`);
  };

  const columns = [
    { header: "Content", accessor: "content" },
    {
      header: "Status",
      accessor: (item) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          item.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
        }`}>
          {item.isActive ? "Active" : "Inactive"}
        </span>
      )
    },
    { 
      header: "Date", 
      accessor: (item) => new Date(item.createdDate).toLocaleString() 
    },
    {
      header: "Actions",
      accessor: (item) => (
        <div className="space-x-2">
          <button
            onClick={() => toggleNotificationStatus(item.id)}
            className={`px-3 py-1 rounded ${
              item.isActive ? "bg-yellow-500 text-white" : "bg-green-500 text-white"
            }`}
          >
            {item.isActive ? "Deactivate" : "Activate"}
          </button>
          <button
            onClick={() => deleteData(item.id)}
            className="text-red-600 hover:text-red-900 px-3 py-1 border border-red-600 rounded"
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Notifications</h2>
      
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Add Notification</h3>
        <NotificationForm 
          formData={formData} 
          onChange={handleFormChange} 
          onSubmit={handleSubmit} 
          isLoading={isLoading}
        />
      </div>
      
      <DataTable 
        data={data} 
        columns={columns} 
        isLoading={isLoading} 
        error={error} 
      />
    </div>
  );
}