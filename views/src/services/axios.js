import axios from 'axios';

// Create a new Axios instance with custom configuration
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_SERVER_BASE_URL, // Set your base URL here
  headers: {'Content-Type': 'application/json'},
  withCredentials: true
});

export default axiosInstance;
