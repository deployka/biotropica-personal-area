import { Analyze } from '../@types/entities/Analyze';
import { baseApi } from './base-api';

export const analyzesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAnalyzes: builder.query<Analyze[], void>({
      query: () => ({
        url: '/analyzes',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAnalyzesQuery } = analyzesApi;

export default analyzesApi;
