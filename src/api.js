import axios from "axios";

const API = axios.create({
  baseURL: "https://YOUR-BACKEND-URL.onrender.com", // baad me replace
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = token;
  return config;
});

export default API;
