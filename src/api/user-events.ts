import { UserEvent } from '../@types/entities/UserEvent';
import { baseApi } from './base-api';

const userEventsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    requestUserEvents: builder.query<UserEvent[], void>({
      query: () => ({
        url: '/user-events',
        method: 'GET',
      }),
    }),
  }),
});

export const { useRequestUserEventsQuery } = userEventsApi;

export default userEventsApi;
