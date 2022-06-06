import { Consultation } from '../@types/entities/Consultation';
import { baseApi } from './base-api';

export const consultationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    requestConsultations: builder.query<Consultation[], void>({
      query: () => ({
        url: '/specialist-consultations',
        method: 'GET',
      }),
    }),

    requestChangeConsultationDatetime: builder.mutation<void, Consultation>({
      query: payload => ({
        url: `/specialist-consultations/${payload.id}`,
        data: payload,
        method: 'PUT',
      }),
    }),

    requestDeleteConsultation: builder.mutation<void, { id: number }>({
      query: payload => ({
        url: `/specialist-consultations/${payload.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useRequestConsultationsQuery,
  useRequestChangeConsultationDatetimeMutation,
  useRequestDeleteConsultationMutation,
} = consultationsApi;

export default consultationsApi;
