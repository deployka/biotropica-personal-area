import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import { HTTP_UNAUTHORIZED } from './httpConstants';

type FetchArguments = Omit<FetchArgs, 'method'> & {
  method: 'PUT' | 'DELETE' | 'GET' | 'POST' | 'PATCH';
};

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BACKEND_URL,
  credentials: 'include',
  prepareHeaders: headers => {
    headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  FetchArguments,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === HTTP_UNAUTHORIZED) {
    const refreshResult = await baseQuery(
      { url: 'auth/refresh', method: 'POST' },
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery(
        { url: 'auth/signout', method: 'GET' },
        api,
        extraOptions,
      );
      localStorage.setItem('token', '');
      return result;
    }
  }

  return result;
};
