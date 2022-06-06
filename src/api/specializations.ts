import { Specialization } from '../@types/entities/Specialization';
import { baseApi } from './base-api';

export const specializationApi = baseApi.injectEndpoints({
  endpoints(builder) {
    return {
      getSpecializationList: builder.query<Specialization[], void>({
        query() {
          return {
            method: 'GET',
            url: 'specializations',
          };
        },
        providesTags: result =>
          result
            ? [
                ...result.map(
                  ({ id }) => ({ type: 'Specialization', id } as const),
                ),
                { type: 'Specialization', id: 'LIST' },
              ]
            : [{ type: 'Specialization', id: 'LIST' }],
      }),
      getSpecialization: builder.query<Specialization, number>({
        query(id) {
          return {
            method: 'GET',
            url: `specializations/${id}`,
          };
        },
        providesTags: (_, __, id) => [{ type: 'Specialization', id }],
      }),
      createSpecialization: builder.mutation<
        Specialization,
        Partial<Specialization>
      >({
        query(Specialization) {
          return {
            method: 'POST',
            url: 'specializations',
            data: Specialization,
          };
        },
        invalidatesTags: [{ type: 'Specialization', id: 'LIST' }],
      }),
      updateSpecialization: builder.mutation<
        Specialization,
        Partial<Specialization> & Pick<Specialization, 'id'>
      >({
        query(Specialization) {
          return {
            method: 'PUT',
            url: `specializations/${Specialization.id}`,
            data: Specialization,
          };
        },
        invalidatesTags: (r, e, { id }) => [{ type: 'Specialization', id }],
      }),
      deleteSpecialization: builder.mutation<Specialization, number>({
        query(id) {
          return {
            method: 'DELETE',
            url: `specializations/${id}`,
          };
        },
        invalidatesTags: [{ type: 'Specialization', id: 'LIST' }],
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
