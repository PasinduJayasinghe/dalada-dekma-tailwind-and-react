import { useState } from "react";

export default function useApi(endpoint) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const baseUrl = "http://localhost:5000/api";

  const fetchData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`${baseUrl}/${endpoint}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const postData = async (body) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`${baseUrl}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to save: ${errorData}`);
      }

      await fetchData();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteData = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`${baseUrl}/${endpoint}/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) throw new Error("Delete failed");

      setData(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const patchData = async (path) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`${baseUrl}/${endpoint}/${path}`, {
        method: "PATCH"
      });

      if (!response.ok) throw new Error("Operation failed");

      await fetchData();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add new putData method for PUT requests
  const putData = async (path) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`${baseUrl}/${endpoint}/${path}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) throw new Error("Operation failed");

      await fetchData();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData, postData, deleteData, patchData, putData };
}