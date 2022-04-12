import { baseApi } from './baseApi';

import {
  SignInData,
  SignUpData,
  ForgotPasswordData,
  ChangePasswordData,
  RestorePasswordData,
  SignInResponse,
} from '../types/auth';

import { PostsResponse } from '../types/common';

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    requestSignIn: builder.mutation<SignInResponse, SignInData>({
      query: payload => ({
        url: '/auth/signin',
        data: payload,
        method: 'POST',
      }),
    }),

    requestSignOut: builder.mutation<PostsResponse, void>({
      query: () => ({
        url: '/auth/signout',
        method: 'POST',
      }),
    }),

    requestRefresh: builder.mutation<PostsResponse, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
    }),

    requestRestorePassword: builder.mutation<PostsResponse, RestorePasswordData>({
      query: payload => ({
        url: '/auth/restore-password',
        params: payload,
        method: 'POST',
      }),
    }),

    requestSignUp: builder.mutation<{
      token: string;
      apiUser: {
        uuid: string;
      }
    }, SignUpData>({
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

    requestForgotPassword: builder.mutation<PostsResponse, ForgotPasswordData>({
      query: payload => ({
        url: '/auth/forgot-password',
        params: payload,
        method: 'POST',
      }),
    }),

    requestChangePassword: builder.mutation<PostsResponse, ChangePasswordData>({
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
