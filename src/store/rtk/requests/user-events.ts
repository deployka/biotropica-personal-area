import { baseApi } from './baseApi';

export interface UserEvent {
  id: number;
  description: string;
  type: string;
  user?: User
  createdAt: string;
  updatedAt: string;
}

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

export const {
  useRequestUserEventsQuery,
} = userEventsApi;

export default userEventsApi;
