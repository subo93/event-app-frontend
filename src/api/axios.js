import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // change to your backend URL
});

export default axiosInstance;
