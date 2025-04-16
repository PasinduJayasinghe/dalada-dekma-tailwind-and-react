import React, { useState } from 'react';

export default function AnnouncementForm({ formData, onChange, onSubmit, isLoading, categories }) {
  const [charCount, setCharCount] = useState(formData.content.length);
  const maxLength = 300; // Set your desired maximum character limit

  const handleContentChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= maxLength) {
      onChange(e); // Call the parent onChange handler
      setCharCount(value.length);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
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
        <div className="md:col-span-2">
          <div className="flex justify-between items-baseline">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <span className={`text-xs ${charCount >= maxLength ? 'text-red-500' : 'text-gray-500'}`}>
              {charCount}/{maxLength}
            </span>
          </div>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleContentChange}
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