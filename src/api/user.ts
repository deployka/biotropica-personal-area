import { ChangeEmailDto } from '../@types/dto/auth/change-email.dto';
import { Admin } from '../@types/entities/Admin';
import { Client } from '../@types/entities/Client';
import { Specialist } from '../@types/entities/Specialist';
import { baseApi } from './base-api';
import { Response } from '../@types/api/response';
import { UpdateUserDto } from '../@types/dto/users/update.dto';
import { Answer } from '../@types/entities/Answer';
import { BaseUser } from '../@types/entities/BaseUser';
import { GetUsersDto } from '../@types/dto/users/get-all.dto';
import { BanUserDto } from '../@types/dto/users/ban.dto';
import { UnbanUserDto } from '../@types/dto/users/unban.dto';

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    currentUser: builder.query<BaseUser, void>({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
      providesTags: ['CurrentUser'],
    }),

    getUser: builder.query<BaseUser, number>({
      query: (id: number) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),

    updateUser: builder.mutation<void, UpdateUserDto>({
      query: dto => ({
        url: '/users/update',
        body: dto,
        method: 'PATCH',
      }),
      invalidatesTags: ['CurrentUser'],
    }),

    updateEmail: builder.mutation<Response, ChangeEmailDto>({
      query: dto => ({
        url: '/users/update-email',
        body: dto,
        method: 'PATCH',
      }),
      invalidatesTags: ['CurrentUser'],
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
        body: newUser,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    banUser: builder.mutation<BaseUser, BanUserDto>({
      query(dto) {
        return {
          method: 'POST',
          url: 'users/ban',
          body: dto,
        };
      },
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    unbanUser: builder.mutation<BaseUser, UnbanUserDto>({
      query(dto) {
        return {
          method: 'POST',
          url: 'users/unban',
          body: dto,
        };
      },
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    getAllUsers: builder.query<BaseUser[], Partial<GetUsersDto>>({
      query(dto) {
        return {
          method: 'GET',
          url: 'users',
          params: dto,
        };
      },
      providesTags: result =>
        [
          ...(result || []).map(({ id }) => ({
            type: 'User' as const,
            id,
          })),
          { type: 'User', id: 'LIST' },
        ] as { type: 'User'; id: string | number }[],
    }),

    getFollowedUsers: builder.query<Client[], { id: number }>({
      query: dto => ({
        method: 'GET',
        url: `users/${dto.id}/followedUsers`,
      }),
    }),

    getFollowedSpecialists: builder.query<BaseUser[], { id: number }>({
      query: dto => ({
        method: 'GET',
        url: `users/${dto.id}/followedSpecialists`,
      }),
    }),
  }),
});

export const {
  useBanUserMutation,
  useUnbanUserMutation,
  useGetAllUsersQuery,
  useCreateUserMutation,
  useCurrentUserQuery,
  useUpdateEmailMutation,
  useUpdateUserMutation,
  useGetQuestionnaireAnswersQuery,
  useGetUserQuery,
  useGetFollowedUsersQuery,
  useGetFollowedSpecialistsQuery,
} = userApi;

export default userApi;
