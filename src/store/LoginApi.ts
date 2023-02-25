import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL, endpoints} from '../helpers/UserLogin';
import {setCookies} from '../helpers/CookieManager';

export const LoginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    getCode: builder.mutation({
      query: payload => ({
        url: endpoints.getCode,
        body: payload,
        method: 'POST',
      }),
    }),
    getToken: builder.mutation({
      query: payload => ({
        url: endpoints.getToken,
        body: payload,
        method: 'POST',
      }),
      async onCacheEntryAdded(args, {cacheDataLoaded}): Promise<void> {
        try {
          const {data, meta} = await cacheDataLoaded;
          if (meta?.response?.status === 200) {
            setCookies(data);
          }
        } catch (e) {
          console.log(e);
        }
      },
    }),
  }),
});

export const {useGetCodeMutation, useGetTokenMutation} = LoginApi;
