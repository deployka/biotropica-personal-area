import { baseApi } from './baseApi';

import { Consultation } from '../types/user';

export const consultationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    requestConsultations: builder.query<Consultation[], void>({
      query: () => ({
        url: '/consultations/specialist',
        method: 'get',
      }),
    }),

    requestChangeConsultationDatetime: builder.mutation<void, Consultation>({
      query: payload => ({
        url: `/consultations/${payload.id}`,
        data: payload,
        method: 'patch',
      }),
    }),

    requestDeleteConsultation: builder.mutation<void, { id: number }>({
      query: payload => ({
        url: `/specialist-consultations/${payload.id}`,
        method: 'delete',
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
