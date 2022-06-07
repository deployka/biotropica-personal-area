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
  }[];
}

export const specialistsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    changeSpecialistData: builder.mutation<void, UpdateSpecialistDto>({
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

    getOneSpecialist: builder.query<Specialist, { id: number }>({
      query: dto => ({
        url: `/specialists/${dto.id}`,
        method: 'GET',
      }),
    }),

    getCurrentSpecialist: builder.query<Specialist, void>({
      query: () => ({
        url: '/specialists/me',
        method: 'GET',
      }),
      providesTags: ['Specialist'],
    }),

    getSpecialists: builder.query<Specialist[], void>({
      query: () => ({
        url: '/specialists',
        method: 'GET',
      }),
      providesTags: ['Specialist'],
    }),

    changeCourses: builder.mutation<void, CourseDataToChange>({
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
  useChangeSpecialistDataMutation,
  useGetCurrentSpecialistQuery,
  useGetOneSpecialistQuery,
  useGetSpecialistsQuery,
  useChangeCoursesMutation,
} = specialistsApi;

export default specialistsApi;
