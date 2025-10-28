import axios from 'axios';
import { auth } from '../config/firebase.js';

// in production, there's no localhost so we have to make this dynamic
const BASE_URL = import.meta.env.MODE === "development" ? `${import.meta.env.VITE_API_URL}/api` : "/api";

const api = axios.create({
    baseURL: BASE_URL,
})

// Add token to requests
api.interceptors.request.use(
    async (config) => {
        const user = auth.currentUser;
        if (user) {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
