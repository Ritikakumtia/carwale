import axios from 'axios';
import { handleApiError } from '../utils/errorHandler';

// Base API URL - can be overridden by environment variable
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      const { token } = JSON.parse(auth);
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiration
    if (error.response?.status === 401) {
      localStorage.removeItem('auth');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    try {
      const response = await api.post('/api/user/register', userData);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/api/user/login', credentials);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/api/user/profile');
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put('/api/user/profile', userData);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }
};

// Brand API calls
export const brandAPI = {
  getAllBrands: async () => {
    try {
      const response = await api.get('/api/brand/getAll-brand');
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  getBrandBySlug: async (slug) => {
    try {
      const response = await api.get(`/api/brand/getBrandBtId-brand/${slug}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  createBrand: async (formData) => {
    try {
      const response = await api.post('/api/brand/create-brand', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  updateBrand: async (id, brandData) => {
    try {
      const response = await api.put(`/api/brand/update-brand/${id}`, brandData);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  deleteBrand: async (id) => {
    try {
      const response = await api.delete(`/api/brand/delete-brand/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }
};

// Car API calls
export const carAPI = {
  getAllCars: async () => {
    try {
      const response = await api.get('/api/car/getAll-car');
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  getCarBySlug: async (slug) => {
    try {
      const response = await api.get(`/api/car/getCarById-car/${slug}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  createCar: async (formData) => {
    try {
      const response = await api.post('/api/car/create-car', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  updateCar: async (id, carData) => {
    try {
      const response = await api.put(`/api/car/update-car/${id}`, carData);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  deleteCar: async (id) => {
    try {
      const response = await api.delete(`/api/car/delete-car/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  getRelatedCars: async (carId, brandId) => {
    try {
      const response = await api.get(`/api/car/related-car/${carId}/${brandId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  filterCars: async (filters) => {
    try {
      const response = await api.post('/api/car/filter-cars', filters);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }
};

// Payment API calls
export const paymentAPI = {
  getBraintreeToken: async () => {
    try {
      const response = await api.get('/api/car/braintree/token');
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  processPayment: async (paymentData) => {
    try {
      const response = await api.post('/api/car/braintree/payment', paymentData);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }
};

// Order API calls
export const orderAPI = {
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/api/order/create', orderData);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  getUserOrders: async () => {
    try {
      const response = await api.get('/api/order/user-orders');
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  getAllOrders: async () => {
    try {
      const response = await api.get('/api/order/all-orders');
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await api.put(`/api/order/status/${orderId}`, { status });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }
};

// Generic API call function
export const apiCall = async (method, endpoint, data = null, config = {}) => {
  try {
    const response = await api({
      method,
      url: endpoint,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export default api;