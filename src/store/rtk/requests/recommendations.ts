import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../../http/axiosBaseQuery';
import { Recommendation } from '../types/user';
import { Specialization } from './specializations';

type CreateRecommendationDto = Pick<Recommendation,
    |'title'
    |'description'
    |'status'
    > & {
    userId: number;
    specialization: Pick<Specialization, 'id'> | number;
}

export const recommendationApi = createApi({
  reducerPath: 'recommendationApi',
  baseQuery: axiosBaseQuery,
  tagTypes: ['Recommendation'],
  endpoints(builder) {
    return {
      getRecommendationList: builder.query<Recommendation[], {userId: number}>({
        query(params) {
          return {
            method: 'get',
            url: 'recommendations',
            params,
          };
        },
        providesTags: result =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'Recommendation', id } as const)),
                { type: 'Recommendation', id: 'LIST' },
              ]
            : [{ type: 'Recommendation', id: 'LIST' }],
      }),
      getRecommendation: builder.query<Recommendation, number>({
        query(id) {
          return {
            method: 'get',
            url: `recommendations/${id}`,
          };
        },
        providesTags: (result, error, id) => [{ type: 'Recommendation', id }],
      }),
      createRecommendation: builder.mutation<Recommendation, CreateRecommendationDto>({
        query(recommendation) {
          return {
            method: 'post',
            url: 'recommendations',
            data: recommendation,
          };
        },
        invalidatesTags: [
          { type: 'Recommendation', id: 'LIST' },
        ],
      }),
      updateRecommendation: builder.mutation<Recommendation, Partial<Recommendation> & Pick<Recommendation, 'id'>>({
        query(recommendation) {
          return {
            method: 'put',
            url: `recommendations/${recommendation.id}`,
            data: recommendation,
          };
        },
        invalidatesTags: (r, e, { id }) => [
          { type: 'Recommendation', id },
        ],
      }),
      deleteRecommendation: builder.mutation<Recommendation, number>({
        query(id) {
          return {
            method: 'delete',
            url: `recommendations/${id}`,
          };
        },
        invalidatesTags: [
          { type: 'Recommendation', id: 'LIST' },
        ],
      }),
    };
  },
});

export const {
  useCreateRecommendationMutation,
  useDeleteRecommendationMutation,
  useGetRecommendationQuery,
  useGetRecommendationListQuery,
  useLazyGetRecommendationQuery,
  useUpdateRecommendationMutation,
} = recommendationApi;
