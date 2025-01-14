import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from '../customBaseQuery'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
})

export default api
