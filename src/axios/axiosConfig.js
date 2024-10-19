import axios from "axios";
const port = import.meta.env.VITE_PORT


const axiosInstance = axios.create({
  baseURL: `https://evangadi-forum-backend-xvz1.onrender.com/api`,
});

export default axiosInstance;
