import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an instance of axios
export const apiClient = axios.create({
  baseURL: "http://localhost:8001/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept the request to add the Authorization header if a token exists
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token'); // Retrieve token from AsyncStorage

      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add the Bearer token
      }
    } catch (error) {
      console.error('Error retrieving token from AsyncStorage', error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);