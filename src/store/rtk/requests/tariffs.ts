import { baseApi } from './baseApi';

import { Tariff, NewTariff } from '../types/tariff';

export const tariffsApi = baseApi.injectEndpoints({

  endpoints: builder => ({
    requestTariffs: builder.query<Tariff[], void>({
      query: () => ({
        url: '/tariffs',
        method: 'get',
      }),
    }),

    requestAddTariff: builder.mutation<Tariff, NewTariff>({
      query: payload => ({
        url: '/tariffs',
        data: payload,
        method: 'post',
      }),
    }),

    requestChangeTariff: builder.mutation<Tariff, Tariff>({
      query: payload => ({
        url: `/tariffs/${payload.id}`,
        data: payload,
        method: 'put',
      }),
    }),

    requestDeleteTariff: builder.mutation<any, {id: number}>({
      query: payload => ({
        url: `/tariffs/${payload.id}`,
        method: 'delete',
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
