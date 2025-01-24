import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/', // Base URL for your backend
});

export default axiosInstance;
