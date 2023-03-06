// api=https://api.datamuse.com/words?ml=sunset

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL, endpoints} from '../helpers/UserLogin';
import CookieManager, {Cookie} from '@react-native-cookies/cookies';

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
          console.log('OnCacheEntry:', data);
          if (meta?.response?.status === 200) {
            const date = new Date(
                new Date().getTime() + 60 * 60 * 24 * 1000,
              ).toJSON();
              console.log(date);
            const values: Cookie = {
              domain: 'dev.studio.bankbuddy.me',
              name: 'auth_token',
              httpOnly: false,
              value: data.token,
              path: '/',
              expires: date,
              secure: true,
            };
            CookieManager.set(BASE_URL, values);
          }
        } catch (e) {
          console.log(e);
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetCodeMutation, useGetTokenMutation} = LoginApi;
