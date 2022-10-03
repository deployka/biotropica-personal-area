import { baseApi } from './base-api';
import { CurrentTariff, NewTariff, Tariff } from '../@types/entities/Tariff';
import { CreateTariffDto } from '../@types/dto/tariffs/create.dto';
import { DeleteTariffDto } from '../@types/dto/tariffs/delete.dto';
import { UpdateTariffDto } from '../@types/dto/tariffs/update.dto';
import { UpdateTariffsOrderDto } from '../@types/dto/tariffs/update-order.dto';

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
      getUserTariffById: builder.query<CurrentTariff, UniqueId>({
        query(id: UniqueId) {
          return {
            method: 'GET',
            url: `current-user-tariff/${id}`,
          };
        },
        providesTags: ['UserTariff'],
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

      getAllTariffs: builder.query<Tariff[], void>({
        query() {
          return {
            method: 'GET',
            url: 'tariffs',
          };
        },
        providesTags: result =>
          result
            ? [
                ...result.map(({ id }) => ({
                  type: 'Tariff' as const,
                  id,
                })),
                { type: 'Tariff', id: 'LIST' },
              ]
            : [{ type: 'Tariff', id: 'LIST' }],
      }),
      addTariff: builder.mutation<Tariff, CreateTariffDto>({
        query: dto => ({
          url: '/tariffs',
          body: dto,
          method: 'POST',
        }),
        invalidatesTags: ['Tariff'],
      }),
      updateTariff: builder.mutation<Tariff, UpdateTariffDto>({
        query: dto => ({
          url: `/tariffs/${dto.id}`,
          body: dto,
          method: 'PUT',
        }),
        invalidatesTags: ['Tariff'],
      }),
      deleteTariff: builder.mutation<void, DeleteTariffDto>({
        query: dto => ({
          url: `/tariffs/${dto.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Tariff'],
      }),
      updateTariffsOrder: builder.mutation<void, UpdateTariffsOrderDto>({
        query: dto => ({
          url: '/tariffs/order',
          method: 'PUT',
          body: dto,
        }),
        invalidatesTags: ['Tariff'],
      }),
    };
  },
});

export const {
  useGetAllTariffsQuery,
  useSelectTariffMutation,
  useAddTariffMutation,
  useUpdateTariffMutation,
  useDeleteTariffMutation,
  useGetCurrentTariffQuery,
  useGetUserTariffByIdQuery,
  useUpdateTariffsOrderMutation,
} = tariffApi;

export default tariffApi;
