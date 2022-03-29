import { baseApi } from './baseApi';

import { Consultation } from '../types/user';

export const consultationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    requestConsultations: builder.query<Consultation[], void>({
      query: () => ({
        url: '/specialist-consultations',
        method: 'get',
      }),
    }),

    requestChangeConsultationDatetime: builder.mutation<any, Consultation>({
      query: payload => ({
        url: `/specialist-consultations/${payload.id}`,
        data: payload,
        method: 'put',
      }),
    }),

    requestDeleteConsultation: builder.mutation<any, { id: number }>({
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
