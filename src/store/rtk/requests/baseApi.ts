import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../../http/axiosBaseQuery';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: axiosBaseQuery,
  tagTypes: ['Avatar', 'Users', 'Specialist'],
  endpoints: () => ({}),
});
