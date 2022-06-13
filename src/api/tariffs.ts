import { baseApi } from './base-api';
import { NewTariff, Tariff } from '../@types/entities/Tariff';

export const tariffApi = baseApi.injectEndpoints({
  endpoints(builder) {
    return {
      getAllTariffs: builder.query<Tariff[], void>({
        query() {
          return {
            method: 'GET',
            url: 'tariffs',
          };
        },
      }),
      selectTariff: builder.mutation<{
        tinkoffForm: string;
      }, number>({
        query(tariffId) {
          return {
            method: 'POST',
            url: `tariffs/${tariffId}/select`,
          };
        },
        // invalidatesTags: [
        //   { type: 'Task', id: 'LIST' },
        // ],
      }),
      requestDeleteTariff: builder.mutation<void, { id: number }>({
        query: payload => ({
          url: `/tariffs/${payload.id}`,
          method: 'DELETE',
        }),
      }),
      requestAddTariff: builder.mutation<
          Tariff,
          Omit<NewTariff, 'createdAt' | 'updatedAt'>
          >({
            query: payload => ({
              url: '/tariffs',
              body: payload,
              method: 'POST',
            }),
          }),
      requestChangeTariff: builder.mutation<Tariff, Tariff>({
        query: payload => ({
          url: `/tariffs/${payload.id}`,
          body: payload,
          method: 'PUT',
        }),
      }),
    };
  },
});

export const {
  useGetAllTariffsQuery,
  useSelectTariffMutation,
  useRequestAddTariffMutation,
  useRequestDeleteTariffMutation,
  useRequestChangeTariffMutation,
} = tariffApi;

export default tariffApi;
