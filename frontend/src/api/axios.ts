import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Request interceptor removed as cookies are handled by browser

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 errors are handled by components or auth context
    return Promise.reject(error);
  }
);

export default api;
