// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust if your backend is hosted elsewhere

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Admin API
export const loginAdmin = (credentials) => api.post('/admin/login', credentials);
export const registerAdmin = (adminData) => api.post('/admin/register', adminData);

// Categories API
export const getCategories = () => api.get('/categories');
export const getCategoryById = (id) => api.get(`/categories/${id}`);
export const createCategory = (categoryData) => api.post('/categories', categoryData);
export const updateCategory = (id, categoryData) => api.put(`/categories/${id}`, categoryData);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// Notices API
export const getNoticesByCategory = (categoryId) => api.get(`/notices/category/${categoryId}`);
export const createNotice = (noticeData) => api.post('/notices', noticeData);
export const updateNotice = (id, noticeData) => api.put(`/notices/${id}`, noticeData);
export const deleteNotice = (id) => api.delete(`/notices/${id}`);

// Notifications API
export const getNotifications = () => api.get('/notifications');
export const getActiveNotifications = () => api.get('/notifications/active');
export const getNotificationById = (id) => api.get(`/notifications/${id}`);
export const createNotification = (notificationData) => api.post('/notifications', notificationData);
export const updateNotification = (id, notificationData) => api.put(`/notifications/${id}`, notificationData);
export const toggleNotificationStatus = (id) => api.patch(`/notifications/${id}/toggle`);
export const deleteNotification = (id) => api.delete(`/notifications/${id}`);

// Subscribers API
export const createSubscriber = (subscriberData) => api.post('/subscribers', subscriberData);

export default api;