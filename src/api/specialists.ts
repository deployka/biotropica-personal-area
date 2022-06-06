import { UpdateSpecialistDto } from '../@types/dto/specialists/update.dto';
import { Specialist } from '../@types/entities/Specialist';
import { baseApi } from './base-api';

// FIXME: DTO
interface CourseDataToChange {
  id: number;
  data: {
    title: string;
    description: string;
    date: string;
  };
}

export const specialistsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    requestChangeSpecialistData: builder.mutation<void, UpdateSpecialistDto>({
      query: payload => ({
        url: '/specialists/me',
        data: {
          specializations: payload.specializations,
          experience: payload.experience,
          education: payload.education,
        },
        method: 'PUT',
      }),
      invalidatesTags: ['Specialist'],
    }),
    getSpecialist: builder.query<Specialist, void>({
      query: () => ({
        url: '/specialists/me',
        method: 'GET',
      }),
      providesTags: ['Specialist'],
    }),

    requestChangeCourses: builder.mutation<void, CourseDataToChange>({
      query: payload => ({
        url: '/specialists/me',
        data: {
          courses: payload.data,
        },
        method: 'PUT',
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
