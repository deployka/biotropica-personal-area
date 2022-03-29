import { baseApi } from './baseApi';

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

    requestUpdateUserData: builder.mutation<any, any>({
      query: payload => ({
        url: '/currentUser',
        data: payload,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useRequestUserDataQuery,
  useRequestUpdateUserDataMutation,
} = userApi;

export default userApi;
