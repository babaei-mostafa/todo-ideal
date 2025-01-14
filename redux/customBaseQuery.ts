import { apiClient } from '@/config/axios'
import { BaseQueryFn } from '@reduxjs/toolkit/query'
import { AxiosError, AxiosRequestConfig } from 'axios'

export const customBaseQuery: BaseQueryFn<
  {
    url: string
    method?: AxiosRequestConfig['method']
    body?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
  },
  unknown,
  unknown
> = async ({ url, method = 'GET', body, params }) => {
  try {
    const result = await apiClient({
      url,
      method,
      data: body,
      params,
    })
    return { data: result.data }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data,
        },
      }
    }
    return {
      error: {
        status: 'FETCH_ERROR',
        data: (error as Error)?.message || 'An unknown error occured',
      },
    }
  }
}
