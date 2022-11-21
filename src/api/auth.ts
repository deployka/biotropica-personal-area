import { Response, SignInResponse } from '../@types/api/response';
import { ChangePasswordDto } from '../@types/dto/auth/change-password.dto';
import { ForgotPasswordDto } from '../@types/dto/auth/forgot-password.dto';
import { RestorePasswordDto } from '../@types/dto/auth/restore-password.dto';
import { SignInDto } from '../@types/dto/auth/signin.dto';
import { SignUpDto, SignUpWithoutPassDto } from '../@types/dto/auth/signup.dto';
import { baseApi } from './base-api';

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<SignInResponse, SignInDto>({
      query: payload => ({
        url: '/auth/signin',
        body: payload,
        method: 'POST',
      }),
    }),

    signOut: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/signout',
        method: 'POST',
      }),
    }),

    getSignUpLink: builder.query<
      { link: string },
      { userId: number; token: string }
    >({
      query: dto => ({
        url: `/auth/signup-link/${dto.userId}`,
        method: 'GET',
        params: {
          token: dto.token,
        },
      }),
    }),

    refresh: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
    }),

    restorePassword: builder.mutation<Response, RestorePasswordDto>({
      query: payload => ({
        url: '/auth/restore-password',
        params: payload,
        method: 'POST',
      }),
    }),

    signUp: builder.mutation<
      {
        token: string;
        apiUser: {
          uuid: string;
        };
      },
      SignUpDto | SignUpWithoutPassDto
    >({
      query: dto => ({
        url: '/auth/signup',
        body: dto,
        method: 'POST',
      }),
    }),

    forgotPassword: builder.mutation<Response, ForgotPasswordDto>({
      query: payload => ({
        url: '/auth/forgot-password',
        body: payload,
        method: 'POST',
      }),
    }),

    changePassword: builder.mutation<Response, ChangePasswordDto>({
      query: payload => ({
        url: '/auth/change-password',
        body: payload,
        method: 'PATCH',
      }),
    }),

    createPassword: builder.mutation<Response, RestorePasswordDto>({
      query: payload => ({
        url: '/auth/create-password',
        body: payload,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignOutMutation,
  useRefreshMutation,
  useSignUpMutation,
  useRestorePasswordMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
  useCreatePasswordMutation,
  useGetSignUpLinkQuery,
} = authApi;

export default authApi;
