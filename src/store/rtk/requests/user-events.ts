import { baseApi } from './baseApi';

const userEventsApi = baseApi.injectEndpoints({

  endpoints: builder => ({
    requestUserEvents: builder.query({
      query: () => ({
        url: '/user-events',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useRequestUserEventsQuery,
} = userEventsApi;

export default userEventsApi;
