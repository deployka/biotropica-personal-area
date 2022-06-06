import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '../http/baseQuery';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Avatar',
    'Users',
    'Specialist',
    'Specialization',
    'Recommendation',
    'Task',
    'TaskComments',
    'Goal',
  ],
  endpoints: () => ({}),
});
