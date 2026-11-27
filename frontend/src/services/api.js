import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://job-portal-backend-hwym.onrender.com",
  timeout: 5000,
  withCredentials: true,
});

export default api;
