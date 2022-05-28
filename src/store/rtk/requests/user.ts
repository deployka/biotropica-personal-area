import { baseApi } from './baseApi';
import { User } from '../types/user';

interface SubmittedData {
  id: number;
  name: string;
  email: string;
  phone: string;
  lastname: string;
  patronymic: string;
  dob: Date;
  gender: string;
}

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    requestUserData: builder.query<any, void>({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
    }),

    getUser: builder.query<User, number>({
      query: (id: number) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),

    requestUpdateUserData: builder.mutation<any, any>({
      query: payload => ({
        url: '/currentUser',
        data: payload,
        method: 'PUT',
      }),
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query(newUser: Partial<User>) {
        return {
          method: 'post',
          url: 'users',
          data: newUser,
        };
      },
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    blockUser: builder.mutation<User, number>({
      query(userId: number) {
        return {
          method: 'post',
          url: `users/${userId}/block`,
        };
      },
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    getAllUsers: builder.query<User[], void>({
      query() {
        return {
          method: 'get',
          url: 'users',
        };
      },
      providesTags: result =>
        [
          ...(result || []).map(({ id }) => ({ type: 'Users', id })),
          { type: 'Users', id: 'LIST' },
        ] as { type: 'Users'; id: string | number }[],
    }),
    getWaitingUsers: builder.query<User[], void>({
      query() {
        return {
          method: 'get',
          url: 'recommendations/waiting',
        };
      },
    }),
  }),
});

export const {
  useBlockUserMutation,
  useGetAllUsersQuery,
  useCreateUserMutation,
  useRequestUserDataQuery,
  useRequestUpdateUserDataMutation,
  useGetUserQuery,
  useGetWaitingUsersQuery,
} = userApi;

export default userApi;
