import axios, { AxiosInstance } from 'axios'

export const baseURL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  withCredentials: false,
})
