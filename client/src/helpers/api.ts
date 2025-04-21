import { env } from '@/app/env'
import axios, { AxiosInstance } from 'axios'

export const api: AxiosInstance = axios.create({
  baseURL: `${env.api.apiUrl}/api/v1`,
  withCredentials: true,
})



// Add request interceptor to include token from localStorage if needed
api.interceptors.request.use(
  (config) => {
    // If running in browser and localStorage has token
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);