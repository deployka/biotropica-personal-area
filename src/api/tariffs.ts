import { NewTariff, Tariff } from '../@types/entities/Tariff';
import { baseApi } from './base-api';

export const tariffsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    requestTariffs: builder.query<Tariff[], void>({
      query: () => ({
        url: '/tariffs',
        method: 'GET',
      }),
    }),

    requestAddTariff: builder.mutation<
      Tariff,
      Omit<NewTariff, 'createdAt' | 'updatedAt'>
    >({
      query: payload => ({
        url: '/tariffs',
        data: payload,
        method: 'POST',
      }),
    }),

    requestChangeTariff: builder.mutation<Tariff, Tariff>({
      query: payload => ({
        url: `/tariffs/${payload.id}`,
        data: payload,
        method: 'PUT',
      }),
    }),

    requestDeleteTariff: builder.mutation<void, { id: number }>({
      query: payload => ({
        url: `/tariffs/${payload.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useRequestTariffsQuery,
  useRequestAddTariffMutation,
  useRequestChangeTariffMutation,
  useRequestDeleteTariffMutation,
} = tariffsApi;

export default tariffsApi;
