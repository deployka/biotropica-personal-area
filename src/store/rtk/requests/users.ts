import { baseApi } from './baseApi';

import { User } from '../types/user';

export const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    requestUsersData: builder.query<User[], void>({
      query: () => ({
        url: '/users',
        method: 'get',
      }),
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query(user) {
        return {
          method: 'post',
          url: 'users',
          data: user,
        };
      },
    }),
  }),
});

export const { useRequestUsersDataQuery, useCreateUserMutation } = usersApi;

export default usersApi;
