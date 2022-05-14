import { baseApi } from './baseApi';
import { Tariff } from '../types/tariff';
import { Task } from '../../@types/Task';

export const tariffApi = baseApi.injectEndpoints({
  endpoints(builder) {
    return {
      getAllTariffs: builder.query<Tariff[], void>({
        query() {
          return {
            method: 'get',
            url: 'tariffs',
          };
        },
      }),
      selectTariff: builder.mutation<{
        tinkoffForm: string;
      }, number>({
        query(tariffId) {
          return {
            method: 'post',
            url: `tariffs/${tariffId}/select`,
          };
        },
        // invalidatesTags: [
        //   { type: 'Task', id: 'LIST' },
        // ],
      }),
    };
  },
});

export const {
  useGetAllTariffsQuery,
  useSelectTariffMutation,
} = tariffApi;

export default tariffApi;
