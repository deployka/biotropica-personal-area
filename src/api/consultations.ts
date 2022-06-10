import { CreateConsultationDto } from '../@types/dto/consultations/create.dto';
import { Consultation } from '../@types/entities/Consultation';
import { baseApi } from './base-api';

export const consultationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSpecialistConsultations: builder.query<Consultation[], void>({
      query: () => ({
        url: '/consultations/specialist-consultations',
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
        url: '/consultations/closest',
        method: 'GET',
      }),
    }),

    createConsultation: builder.mutation<Consultation, CreateConsultationDto>({
      query: dto => ({
        url: '/consultations',
        method: 'POST',
        body: dto,
      }),
    }),

    changeConsultationDatetime: builder.mutation<void, Consultation>({
      query: payload => ({
        url: `/consultations/specialist-consultations/${payload.id}`,
        body: payload,
        method: 'PUT',
      }),
    }),

    deleteConsultation: builder.mutation<void, { id: number }>({
      query: payload => ({
        url: `/consultations/specialist-consultations/${payload.id}`,
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
