import { ChangeEmailDto } from '../@types/dto/auth/change-email.dto';
import { Admin } from '../@types/entities/Admin';
import { Client } from '../@types/entities/Client';
import { Specialist } from '../@types/entities/Specialist';
import { baseApi } from './base-api';
import { Response } from '../@types/api/response';
import { UpdateUserDto } from '../@types/dto/users/update.dto';
import { Answer } from '../@types/entities/Answer';

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    currentUser: builder.query<Client & Admin & Specialist, void>({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
    }),

    getUser: builder.query<Client & Admin & Specialist, number>({
      query: (id: number) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),

    updateUser: builder.mutation<void, UpdateUserDto>({
      query: payload => ({
        url: '/users/update',
        body: payload,
        method: 'PATCH',
      }),
    }),

    updateEmail: builder.mutation<Response, ChangeEmailDto>({
      query: dto => ({
        url: '/users/update-email',
        data: dto,
        method: 'PUT',
      }),
    }),

    getQuestionnaireAnswers: builder.query<Answer[], number>({
      query: id => ({
        method: 'GET',
        url: `users/${id}/answers`,
      }),
    }),

    createUser: builder.mutation<
      Client | Admin | Specialist,
      Partial<Client | Admin | Specialist>
    >({
      query: newUser => ({
        method: 'POST',
        url: 'users',
        data: newUser,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    blockUser: builder.mutation<Client | Specialist, number>({
      query(userId: number) {
        return {
          method: 'POST',
          url: `users/${userId}/block`,
        };
      },
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    getAllUsers: builder.query<(Client & Admin & Specialist)[], void>({
      query() {
        return {
          method: 'GET',
          url: 'users',
        };
      },
      providesTags: result =>
        [
          ...(result || []).map(({ id }) => ({ type: 'Users', id })),
          { type: 'User', id: 'LIST' },
        ] as { type: 'User'; id: string | number }[],
    }),
  }),
});

export const {
  useBlockUserMutation,
  useGetAllUsersQuery,
  useCreateUserMutation,
  useCurrentUserQuery,
  useUpdateEmailMutation,
  useUpdateUserMutation,
  useGetQuestionnaireAnswersQuery,
  useGetUserQuery,
} = userApi;

export default userApi;
