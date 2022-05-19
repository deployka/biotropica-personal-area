import { baseApi } from './baseApi';

interface SpecialistDataToChange {
  id: number,
  data: {
    specializations: string[],
    experience: string,
    education: string,
  }
}

interface CourseDataToChange {
  id: number,
  data: {
    title: string,
    description: string,
    date: string,
  }
}

export const specialistsApi = baseApi.injectEndpoints({

  endpoints: builder => ({
    requestChangeSpecialistData: builder.mutation<any, SpecialistDataToChange>({
      query: payload => ({
        url: `/specialists/${payload.id}`,
        data: {
          specializations: payload.data.specializations,
          experience: payload.data.experience,
          education: payload.data.education,
        },
        method: 'put',
      }),
    }),

    requestChangeCourses: builder.mutation<any, CourseDataToChange>({
      query: payload => ({
        url: '/specialists/me',
        data: {
          courses: payload.data,
        },
        method: 'put',
      }),
    }),
  }),
});

export const {
  useRequestChangeSpecialistDataMutation,
  useRequestChangeCoursesMutation,
} = specialistsApi;

export default specialistsApi;
