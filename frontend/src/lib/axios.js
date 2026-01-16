import axios from "axios";
import { ENV } from "../config/env.config";

const axiosInstance = axios.create({
    baseURL: ENV.API_BASE_URL,
    withCredentials: true
})

export default axiosInstance;