import axios from "axios";
import { API_BASE_URL } from "./constants";
import { useNavigate } from "react-router-dom";

// Creating axios instance
const axiosApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10s timeout
});

// A request interceptor to add auth token
axiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// A response interceptor for better error handling
axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handling common errors
    if (error.response?.status === 401) {
      // User is unauthorized - Clear the token ad then redirect to the login.
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      const navigate = useNavigate();
      navigate("/api/auth/login");
    }

    return Promise.reject(error);
  }
);

export default axiosApi;
