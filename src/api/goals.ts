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
    }),

    createGoal: builder.mutation<Goal, CreateGoalDto>({
      query: dto => ({
        url: '/goals',
        data: dto,
        method: 'POST',
      }),
    }),

    updateGoal: builder.mutation<Goal, UpdateGoalDto>({
      query: dto => ({
        url: `/goals/${dto.id}`,
        data: dto,
        method: 'PUT',
      }),
    }),

    deleteGoal: builder.mutation<void, DeleteGoalDto>({
      query: dto => ({
        url: `/goals/${dto.id}`,
        method: 'DELETE',
      }),
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
