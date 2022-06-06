import { CreateProgressDto } from '../@types/dto/progress/create.dto';
import { GetAllProgressPostsDto } from '../@types/dto/progress/getAll.dto';
import { UpdateProgressDto } from '../@types/dto/progress/update.dto';
import { Progress } from '../@types/entities/Progress';
import { baseApi } from './base-api';

export const progressApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProgressPosts: builder.query<Progress[], GetAllProgressPostsDto>({
      query: dto => ({
        url: `/progress/${dto.userId}`,
        method: 'GET',
      }),
    }),
    createProgressPost: builder.mutation<Progress, CreateProgressDto>({
      query: dto => ({
        url: '/progress',
        method: 'POST',
        body: dto,
      }),
    }),
    updateProgressPost: builder.mutation<Progress, UpdateProgressDto>({
      query: dto => ({
        url: `/progress/${dto.id}`,
        method: 'PUT',
        body: dto,
      }),
    }),
  }),
});

export const {
  useGetProgressPostsQuery,
  useCreateProgressPostMutation,
  useUpdateProgressPostMutation,
} = progressApi;

export default progressApi;
