import { CreateGoalDto } from '../@types/dto/goals/create.dto';
import { DeleteGoalDto } from '../@types/dto/goals/delete.dto';
import { GetOneGoalDto } from '../@types/dto/goals/get-one.dto';
import { UpdateGoalDto } from '../@types/dto/goals/update.dto';
import { Goal } from '../@types/entities/Goal';
import { baseApi } from './base-api';

export const goalsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getGoals: builder.query<Goal[], void>({
      query: () => ({
        url: '/goals',
        method: 'GET',
      }),
      transformResponse: (res: Goal[]) => res.filter(g => !g.completed),
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Goal', id } as const)),
              { type: 'Goal', id: 'LIST' },
            ]
          : [{ type: 'Goal', id: 'LIST' }],
    }),

    getGoal: builder.query<Goal, GetOneGoalDto>({
      query: dto => ({
        url: `/goals/${dto.id}`,
        method: 'GET',
      }),
      providesTags: result => [{ type: 'Goal', id: result?.id }],
    }),

    createGoal: builder.mutation<Goal, CreateGoalDto>({
      query: dto => ({
        url: '/goals',
        body: dto,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Goal', id: 'LIST' }],
    }),

    updateGoal: builder.mutation<Goal, UpdateGoalDto>({
      query: dto => ({
        url: `/goals/update/${dto.id}`,
        body: dto,
        method: 'PATCH',
      }),
      invalidatesTags: (r, e, { id }) => [{ type: 'Goal', id }],
    }),

    deleteGoal: builder.mutation<void, DeleteGoalDto>({
      query: dto => ({
        url: `/goals/delete/${dto.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Goal', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetGoalsQuery,
  useUpdateGoalMutation,
  useCreateGoalMutation,
  useDeleteGoalMutation,
  useGetGoalQuery,
} = goalsApi;

export default goalsApi;
