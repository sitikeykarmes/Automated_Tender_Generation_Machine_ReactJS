import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  signup: (userData) => api.post('/auth/signup', userData),
  login: (userData) => api.post('/auth/login', userData),
};

// Tender APIs
export const tenderAPI = {
  saveTender: (tenderData) => api.post('/tenders/save', tenderData),
  getTenderHistory: () => api.get('/tenders/history'),
  getTender: (id) => api.get(`/tenders/${id}`),
  deleteTender: (id) => api.delete(`/tenders/${id}`),
};

export default api;