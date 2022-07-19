import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '../http/baseQuery';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Avatar',
    'User',
    'Specialist',
    'Specialization',
    'Recommendation',
    'Task',
    'TaskComment',
    'Progress',
    'Goal',
    'CurrentUser',
    'Analyze',
    'CurrentTariff',
  ],
  endpoints: () => ({}),
});
