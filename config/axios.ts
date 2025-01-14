import axios, { AxiosInstance } from 'axios'

export const baseURL: string | undefined = 'http://frontendtest.ideallco.com/api/'

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  withCredentials: false,
})
