import axios, { AxiosInstance } from 'axios'

export const api: AxiosInstance = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_API_URL!}/api/v1`,
baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true,
})