import { baseApi } from './base-api';
import { CurrentTariff, NewTariff, Tariff } from '../@types/entities/Tariff';

export const tariffApi = baseApi.injectEndpoints({
  endpoints(builder) {
    return {
      getCurrentTariff: builder.query<CurrentTariff, void>({
        query() {
          return {
            method: 'GET',
            url: 'current-user-tariff',
          };
        },
        providesTags: ['CurrentTariff'],
      }),
      getAllTariffs: builder.query<Tariff[], void>({
        query() {
          return {
            method: 'GET',
            url: 'tariffs',
          };
        },
      }),
      selectTariff: builder.mutation<
        {
          tinkoffForm: string;
        },
        number
      >({
        query(tariffId) {
          return {
            method: 'POST',
            url: `tariffs/${tariffId}/select`,
          };
        },
        invalidatesTags: ['CurrentTariff'],
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
  useGetCurrentTariffQuery,
} = tariffApi;

export default tariffApi;
