import React, { useState, useEffect } from "react";

export default function LocationForm({ formData, onChange, onSubmit, isLoading, categories }) {
  const [charCount, setCharCount] = useState(formData.description?.length || 0);
  const maxLength = 150; // Set your desired maximum character limit

  // Update charCount when formData.description changes
  useEffect(() => {
    setCharCount(formData.description?.length || 0);
  }, [formData.description]);

  const handleDescriptionChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= maxLength) {
      onChange(e); // Call the parent onChange handler
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            {Object.entries(categories).map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Latitude
          </label>
          <input
            type="number"
            step="any"
            name="lat"
            value={formData.lat}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Longitude
          </label>
          <input
            type="number"
            step="any"
            name="lng"
            value={formData.lng}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Operating Hours
          </label>
          <input
            type="text"
            name="hours"
            value={formData.hours}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="md:col-span-2">
          <div className="flex justify-between items-baseline">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <span className={`text-xs ${charCount >= maxLength ? 'text-red-500' : 'text-gray-500'}`}>
              {charCount}/{maxLength}
            </span>
          </div>
          <textarea
            name="description"  // Changed from "content" to "description"
            value={formData.description}
            onChange={handleDescriptionChange}
            className="w-full p-2 border border-gray-300 rounded h-24"
            required
            maxLength={maxLength}
          />
          {charCount >= maxLength && (
            <p className="text-xs text-red-500 mt-1">
              Maximum character limit reached
            </p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isLoading || charCount > maxLength}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}