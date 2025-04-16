import { env } from '@/app/env'
import axios, { AxiosInstance } from 'axios'

export const api: AxiosInstance = axios.create({
  baseURL: `${env.api.apiUrl}/api/v1`,
  withCredentials: true,
})