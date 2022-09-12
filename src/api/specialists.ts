import { ChangeCourseDto } from '../@types/dto/specialists/change-courses.dto';
import { UpdateSpecialistDto } from '../@types/dto/specialists/update.dto';
import { BaseUser } from '../@types/entities/BaseUser';
import { Specialist } from '../@types/entities/Specialist';
import { baseApi } from './base-api';

export const specialistsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
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
      providesTags: ['Specialist', 'CurrentUser'],
    }),

    getSpecialists: builder.query<Specialist[], void>({
      query: () => ({
        url: '/specialists',
        method: 'GET',
      }),
      providesTags: ['Specialist'],
    }),

    changeSpecialistData: builder.mutation<void, UpdateSpecialistDto>({
      query: dto => ({
        url: '/specialists/me',
        body: dto,
        method: 'PUT',
      }),
      invalidatesTags: ['Specialist', 'CurrentUser'],
    }),

    changeCourses: builder.mutation<void, ChangeCourseDto>({
      query: body => ({
        url: '/specialists/me',
        body,
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
