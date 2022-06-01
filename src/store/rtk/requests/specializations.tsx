import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../../http/axiosBaseQuery';

export interface Specialization {
  id: number;
  title: string;
  key: string;
}

export const specializationApi = createApi({
  reducerPath: 'specializationApi',
  baseQuery: axiosBaseQuery,
  tagTypes: ['Specialization'],
  endpoints(builder) {
    return {
      getSpecializationList: builder.query<Specialization[], void>({
        query() {
          return {
            method: 'get',
            url: 'specializations',
          };
        },
        providesTags: result =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'Specialization', id } as const)),
                { type: 'Specialization', id: 'LIST' },
              ]
            : [{ type: 'Specialization', id: 'LIST' }],
      }),
      getSpecialization: builder.query<Specialization, number>({
        query(id) {
          return {
            method: 'get',
            url: `specializations/${id}`,
          };
        },
        providesTags: (result, error, id) => [{ type: 'Specialization', id }],
      }),
      createSpecialization: builder.mutation<Specialization, Partial<Specialization>>({
        query(Specialization) {
          return {
            method: 'post',
            url: 'specializations',
            data: Specialization,
          };
        },
        invalidatesTags: [
          { type: 'Specialization', id: 'LIST' },
        ],
      }),
      updateSpecialization: builder.mutation<Specialization, Partial<Specialization> & Pick<Specialization, 'id'>>({
        query(Specialization) {
          return {
            method: 'put',
            url: `specializations/${Specialization.id}`,
            data: Specialization,
          };
        },
        invalidatesTags: (r, e, { id }) => [
          { type: 'Specialization', id },
        ],
      }),
      deleteSpecialization: builder.mutation<Specialization, number>({
        query(id) {
          return {
            method: 'delete',
            url: `specializations/${id}`,
          };
        },
        invalidatesTags: [
          { type: 'Specialization', id: 'LIST' },
        ],
      }),
    };
  },
});

export const {
  useCreateSpecializationMutation,
  useDeleteSpecializationMutation,
  useGetSpecializationQuery,
  useGetSpecializationListQuery,
  useLazyGetSpecializationQuery,
  useUpdateSpecializationMutation,
} = specializationApi;
