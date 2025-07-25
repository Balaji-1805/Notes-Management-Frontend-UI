import axios from "axios";

const API = axios.create({
  baseURL: "https://notes-management-frontend-ui.vercel.app", // 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.token = token; 
  return req;
});

export default API;
