// File: api.js (updated)
import axios from 'axios';

// Update the base URL to handle both development and production
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor to handle errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        // Handle unauthorized access (e.g., redirect to login)
        localStorage.removeItem('token');
        window.location = '/login';
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject(new Error('No response from server'));
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(error);
    }
  }
);

// Auth API
export const authApi = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  

  
// In api.js - update the login function in authApi
login: async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    }
    throw new Error('No token received');
  } catch (error) {
    // Handle specific error cases
    if (error.response && error.response.data && error.response.data.errors) {
      const errorMessages = error.response.data.errors.map(err => err.msg).join(', ');
      throw new Error(errorMessages);
    }
    throw error;
  }
},
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await api.get('/auth/logout');
      
      // Always clear local storage on logout attempt
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      return response.data;
    } catch (error) {
      // Even if the server logout fails, ensure client-side cleanup
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      if (error.response) {
        throw new Error(error.response.data.msg || 'Logout failed');
      }
      throw new Error('Network error during logout');
    }
  },
  
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post(`/auth/reset-password/${token}`, { password: newPassword });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  sendVerificationEmail: async () => {
    try {
      const response = await api.post('/auth/send-verification');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  verifyEmail: async (token) => {
    try {
      const response = await api.get(`/auth/verify-email/${token}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// User API
export const userApi = {
  getMyProfile: async () => {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updateProfile: async (updates) => {
    try {
      const response = await api.put('/users/me', updates);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getUserProfile: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/profile`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Export all APIs
export default {
  auth: authApi,
  user: userApi
};