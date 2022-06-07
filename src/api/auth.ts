import { Response, SignInResponse } from '../@types/api/response';
import { ChangePasswordDto } from '../@types/dto/auth/change-password.dto';
import { ForgotPasswordDto } from '../@types/dto/auth/forgot-password.dto';
import { RestorePasswordDto } from '../@types/dto/auth/restore-password.dto';
import { SignInDto } from '../@types/dto/auth/signin.dto';
import { SignUpDto } from '../@types/dto/auth/signup.dto';
import { baseApi } from './base-api';

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<SignInResponse, SignInDto>({
      query: payload => ({
        url: '/auth/signin',
        data: payload,
        method: 'POST',
      }),
    }),

    signOut: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/signout',
        method: 'POST',
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

    forgotPassword: builder.mutation<Response, ForgotPasswordDto>({
      query: payload => ({
        url: '/auth/forgot-password',
        params: payload,
        method: 'POST',
      }),
    }),

    changePassword: builder.mutation<Response, ChangePasswordDto>({
      query: payload => ({
        url: '/auth/change-password',
        data: payload,
        method: 'PATCH',
      }),
    }),

    createPassword: builder.mutation<Response, RestorePasswordDto>({
      query: payload => ({
        url: '/auth/create-password',
        data: payload,
        method: 'PATCH',
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
} = authApi;

export default authApi;
