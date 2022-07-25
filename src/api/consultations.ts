import { CreateConsultationDto } from '../@types/dto/consultations/create.dto';
import { Consultation } from '../@types/entities/Consultation';
import { baseApi } from './base-api';

export const consultationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSpecialistConsultations: builder.query<Consultation[], UniqueId>({
      query: (id: UniqueId) => ({
        url: `/consultations/specialist/${id}`,
        method: 'GET',
      }),
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

    changeConsultationDatetime: builder.mutation<void, Consultation>({
      query: payload => ({
        url: `/consultations/${payload.id}`,
        body: payload,
        method: 'PUT',
      }),
    }),

    deleteConsultation: builder.mutation<void, { id: number }>({
      query: payload => ({
        url: `/consultations/${payload.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetConsultationsQuery,
  useGetSpecialistConsultationsQuery,
  useChangeConsultationDatetimeMutation,
  useDeleteConsultationMutation,
  useCreateConsultationMutation,
  useGetClosestConsultationQuery,
  useGetLastConsultationQuery,
  useGetConsultationQuery,
} = consultationsApi;

export default consultationsApi;
