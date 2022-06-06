import { SignInResponse } from '../@types/api/response';
import { ChangePasswordDto } from '../@types/dto/auth/change-password.dto';
import { ForgotPasswordDto } from '../@types/dto/auth/forgot-password.dto';
import { RestorePasswordDto } from '../@types/dto/auth/restore-password.dto';
import { SignInDto } from '../@types/dto/auth/signin.dto';
import { SignUpDto } from '../@types/dto/auth/signup.dto';
import { baseApi } from './base-api';

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    requestSignIn: builder.mutation<SignInResponse, SignInDto>({
      query: payload => ({
        url: '/auth/signin',
        data: payload,
        method: 'POST',
      }),
    }),

    requestSignOut: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/signout',
        method: 'POST',
      }),
    }),

    requestRefresh: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
    }),

    requestRestorePassword: builder.mutation<void, RestorePasswordDto>({
      query: payload => ({
        url: '/auth/restore-password',
        params: payload,
        method: 'POST',
      }),
    }),

    requestSignUp: builder.mutation<
      {
        token: string;
        apiUser: {
          uuid: string;
        };
      },
      SignUpDto
    >({
      query: payload => ({
        url: '/auth/signup',
        data: {
          login: payload.email,
          password: payload.password,
          role: process.env.REACT_APP_ROLE_SECRET,
        },
        method: 'POST',
      }),
    }),

    requestForgotPassword: builder.mutation<void, ForgotPasswordDto>({
      query: payload => ({
        url: '/auth/forgot-password',
        params: payload,
        method: 'POST',
      }),
    }),

    requestChangePassword: builder.mutation<void, ChangePasswordDto>({
      query: payload => ({
        url: '/auth/change-password',
        data: payload,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useRequestSignInMutation,
  useRequestSignOutMutation,
  useRequestRefreshMutation,
  useRequestSignUpMutation,
  useRequestRestorePasswordMutation,
  useRequestForgotPasswordMutation,
  useRequestChangePasswordMutation,
} = authApi;

export default authApi;
