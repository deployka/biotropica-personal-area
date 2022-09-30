import { CreateConsultationDto } from '../@types/dto/consultations/create.dto';
import { UpdateConsultationDto } from '../@types/dto/consultations/update.dto';
import { Consultation } from '../@types/entities/Consultation';
import { baseApi } from './base-api';

export const consultationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSpecialistConsultations: builder.query<Consultation[], UniqueId>({
      query: (id: UniqueId) => ({
        url: `/consultations/specialist/${id}`,
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? [
              ...result.map(
                ({ id }) => ({ type: 'SpecialistConsultation', id } as const),
              ),
              { type: 'SpecialistConsultation', id: 'LIST' },
            ]
          : [{ type: 'SpecialistConsultation', id: 'LIST' }],
    }),

    getConsultations: builder.query<Consultation[], void>({
      query: () => ({
        url: '/consultations',
        method: 'GET',
      }),
    }),

    getConsultation: builder.query<Consultation, { id: number }>({
      query: dto => ({
        url: `/consultations/${dto.id}`,
        method: 'GET',
      }),
    }),

    getClosestConsultation: builder.query<Consultation, void>({
      query: () => ({
        url: '/consultations/closest',
        method: 'GET',
      }),
    }),

    getLastConsultation: builder.query<Consultation, void>({
      query: () => ({
        url: '/consultations/last-added',
        method: 'GET',
      }),
      providesTags: ['LastAddedConsultation', 'InvoiceStatus', 'Invoice'],
    }),

    createConsultation: builder.mutation<
      { tinkoffForm: string; consultation: Consultation },
      CreateConsultationDto
    >({
      query: dto => ({
        url: '/consultations',
        method: 'POST',
        body: dto,
      }),
      invalidatesTags: [
        'CurrentTariff',
        'LastAddedConsultation',
        'InvoiceStatus',
      ],
    }),

    updateConsultationDate: builder.mutation<void, UpdateConsultationDto>({
      query: payload => ({
        url: `/consultations/date/${payload.id}`,
        body: payload,
        method: 'PUT',
      }),
      invalidatesTags: ['SpecialistConsultation'],
    }),

    updateConsultation: builder.mutation<void, Partial<Consultation>>({
      query: payload => ({
        url: `/consultations/${payload.id}`,
        body: payload,
        method: 'PUT',
      }),
      invalidatesTags: ['SpecialistConsultation'],
    }),

    deleteConsultation: builder.mutation<void, { id: number }>({
      query: payload => ({
        url: `/consultations/${payload.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SpecialistConsultation'],
    }),
  }),
});

export const {
  useGetConsultationsQuery,
  useGetSpecialistConsultationsQuery,
  useUpdateConsultationMutation,
  useDeleteConsultationMutation,
  useCreateConsultationMutation,
  useGetClosestConsultationQuery,
  useGetLastConsultationQuery,
  useGetConsultationQuery,
  useUpdateConsultationDateMutation,
} = consultationsApi;

export default consultationsApi;
