import axios from 'axios';

// Base API URL - adjust this based on your environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens or logging
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error:', error.message);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// ==================== HOME API ====================
export const homeAPI = {
  // Add your home-related API calls here
  getHome: () => api.get('/api'),
  // Example: getHomeData: () => api.get('/api/home-data'),
};

// ==================== FACULTY API ====================
export const facultyAPI = {
  // Get all faculty
  getAllFaculty: () => api.get('/api/faculty'),
  
  // Get single faculty by ID
  getFacultyById: (id) => api.get(`/api/faculty/${id}`),
  
  // Create new faculty
  createFaculty: (data) => api.post('/api/faculty', data),
  
  // Update faculty
  updateFaculty: (id, data) => api.put(`/api/faculty/${id}`, data),
  
  // Delete faculty
  deleteFaculty: (id) => api.delete(`/api/faculty/${id}`),
};

// ==================== STUDY TOURS API ====================
export const studyToursAPI = {
  // Get all study tours
  getAllStudyTours: () => api.get('/api/studytours'),
  
  // Get single study tour by ID
  getStudyTourById: (id) => api.get(`/api/studytours/${id}`),
  
  // Create new study tour
  createStudyTour: (data) => api.post('/api/studytours', data),
  
  // Update study tour
  updateStudyTour: (id, data) => api.put(`/api/studytours/${id}`, data),
  
  // Delete study tour
  deleteStudyTour: (id) => api.delete(`/api/studytours/${id}`),
};

// ==================== MOBALITY API ====================
export const mobalityAPI = {
  // Get all mobality records
  getAllMobality: () => api.get('/api/mobality'),
  
  // Get single mobality by ID
  getMobalityById: (id) => api.get(`/api/mobality/${id}`),
  
  // Create new mobality
  createMobality: (data) => api.post('/api/mobality', data),
  
  // Update mobality
  updateMobality: (id, data) => api.put(`/api/mobality/${id}`, data),
  
  // Delete mobality
  deleteMobality: (id) => api.delete(`/api/mobality/${id}`),
};

// ==================== GLOBAL PARTNERS API ====================
export const globalPartnersAPI = {
  // Get all global partners
  getAllPartners: () => api.get('/api/globalpartners'),
  
  // Get single partner by ID
  getPartnerById: (id) => api.get(`/api/globalpartners/${id}`),
  
  // Create new partner
  createPartner: (data) => api.post('/api/globalpartners', data),
  
  // Update partner
  updatePartner: (id, data) => api.put(`/api/globalpartners/${id}`, data),
  
  // Delete partner
  deletePartner: (id) => api.delete(`/api/globalpartners/${id}`),
};

// ==================== UTILITY FUNCTIONS ====================

// Upload image/file with proper headers
export const uploadFile = async (endpoint, formData) => {
  try {
    const response = await api.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Batch delete
export const batchDelete = async (endpoint, ids) => {
  try {
    const response = await api.post(endpoint, { ids });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Export the axios instance for custom calls
export default api;