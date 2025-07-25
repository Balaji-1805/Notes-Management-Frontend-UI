import axios from "axios";

const API = axios.create({
  baseURL: "https://api-node-notesapp.onrender.com/", // 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.token = token; 
  return req;
});

export default API;
