// src/redux/slices/apiSlice.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => '/items'
    })
  })
})

export const { useGetItemsQuery } = apiSlice
