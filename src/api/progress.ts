import { CreateProgressDto } from '../@types/dto/progress/create.dto';
import { GetAllProgressPostsDto } from '../@types/dto/progress/get-all.dto';
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
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Progress', id } as const)),
              { type: 'Progress', id: 'LIST' },
            ]
          : [{ type: 'Progress', id: 'LIST' }],
    }),
    createProgressPost: builder.mutation<Progress, CreateProgressDto>({
      query: dto => ({
        url: '/progress',
        method: 'POST',
        body: dto,
      }),
      invalidatesTags: [{ type: 'Progress', id: 'LIST' }],
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
