import toast from 'react-hot-toast';

// Default error messages
const DEFAULT_ERRORS = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Unauthorized access. Please login.',
  FORBIDDEN: 'Access denied. Insufficient permissions.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Invalid input data.',
  UNKNOWN_ERROR: 'An unexpected error occurred.'
};

// Error handler utility
export const handleApiError = (error, customMessage = null) => {
  let errorMessage = customMessage || DEFAULT_ERRORS.UNKNOWN_ERROR;
  
  if (error?.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        errorMessage = data?.message || DEFAULT_ERRORS.VALIDATION_ERROR;
        break;
      case 401:
        errorMessage = data?.message || DEFAULT_ERRORS.UNAUTHORIZED;
        break;
      case 403:
        errorMessage = data?.message || DEFAULT_ERRORS.FORBIDDEN;
        break;
      case 404:
        errorMessage = data?.message || DEFAULT_ERRORS.NOT_FOUND;
        break;
      case 500:
        errorMessage = data?.message || DEFAULT_ERRORS.SERVER_ERROR;
        break;
      default:
        errorMessage = data?.message || DEFAULT_ERRORS.UNKNOWN_ERROR;
    }
  } else if (error?.request) {
    // Network error
    errorMessage = DEFAULT_ERRORS.NETWORK_ERROR;
  } else if (error?.message) {
    // Other error with message
    errorMessage = error.message;
  }
  
  // Show toast notification
  toast.error(errorMessage);
  
  // Log error for debugging
  console.error('API Error:', error);
  
  return errorMessage;
};

// Success message handler
export const handleSuccess = (message, data = null) => {
  toast.success(message);
  
  if (data) {
    console.log('Success data:', data);
  }
  
  return message;
};

// Loading state handler
export const handleLoading = (message = 'Loading...') => {
  return toast.loading(message);
};

// Dismiss loading toast
export const dismissLoading = (toastId) => {
  toast.dismiss(toastId);
};

// Fallback image handler
export const getFallbackImage = (type = 'car') => {
  const fallbackImages = {
    car: '/images/default-car.png',
    brand: '/images/default-brand.png',
    user: '/images/default-user.png'
  };
  
  return fallbackImages[type] || fallbackImages.car;
};

// Safe brand name handler
export const getSafeBrandName = (brand) => {
  if (!brand) return 'Unknown Brand';
  
  if (typeof brand === 'object') {
    return brand.name || 'Unknown Brand';
  }
  
  return brand.toString();
};

// Format price utility
export const formatPrice = (price) => {
  if (!price) return '$0';
  
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numPrice)) return '$0';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numPrice);
};

// Validate form data
export const validateFormData = (data, requiredFields = []) => {
  const errors = {};
  
  requiredFields.forEach(field => {
    if (!data[field] || data[field].toString().trim() === '') {
      errors[field] = `${field} is required`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Image URL converter for Google Drive
export const convertGoogleDriveUrl = (url) => {
  if (!url) return null;
  
  // If already a direct link, return as is
  if (url.includes('uc?id=')) return url;
  
  // Convert Google Drive share URL to direct link
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (fileIdMatch) {
    return `https://drive.google.com/uc?id=${fileIdMatch[1]}`;
  }
  
  return url;
};

// Retry mechanism for failed API calls
export const retryApiCall = async (apiCall, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
};

export default {
  handleApiError,
  handleSuccess,
  handleLoading,
  dismissLoading,
  getFallbackImage,
  getSafeBrandName,
  formatPrice,
  validateFormData,
  convertGoogleDriveUrl,
  retryApiCall
};