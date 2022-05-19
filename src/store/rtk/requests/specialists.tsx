import { baseApi } from './baseApi';
import { ISelect } from '../../../shared/Form/Select/SelectCustom';
import { Specialization } from './specializations';
import { Specialist } from '../types/user';

interface SpecialistDataToChange {
  id: number,
  data: {
    specializations?: string[],
    experience?: string,
    education?: string,
  }
}

export interface SpecialistUpdateDto {
  specializations?: Specialization[],
  experience?: string,
  education?: string,
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
    requestChangeSpecialistData: builder.mutation<any, SpecialistUpdateDto>({
      query: payload => ({
        url: '/specialists/me',
        data: {
          specializations: payload.specializations,
          experience: payload.experience,
          education: payload.education,
        },
        method: 'put',
      }),
      invalidatesTags: ['Specialist'],
    }),
    getSpecialist: builder.query<Specialist, void>({
      query: () => ({
        url: '/specialists/me',
        method: 'get',
      }),
      providesTags: ['Specialist'],
    }),

    requestChangeCourses: builder.mutation<any, CourseDataToChange>({
      query: payload => ({
        url: '/specialists/me',
        data: {
          courses: payload.data,
        },
        method: 'put',
      }),
      invalidatesTags: ['Specialist'],
    }),
  }),
});

export const {
  useRequestChangeSpecialistDataMutation,
  useGetSpecialistQuery,
  useRequestChangeCoursesMutation,
} = specialistsApi;

export default specialistsApi;
