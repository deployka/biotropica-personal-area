import { createApi } from '@reduxjs/toolkit/query/react';
import { CompetitionTask, CreateCompetitionTask, CreateEventTask, CreateTrainingTask, EventTask, Task, TrainingTask } from '../../@types/Task';
import { axiosBaseQuery } from '../../../http/axiosBaseQuery';

type UpdateTaskParam = Partial<
    | TrainingTask
    | EventTask
    | CompetitionTask
>

type CreateTaskParam = Partial<
    | CreateTrainingTask
    | CreateEventTask
    | CreateCompetitionTask
>

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: axiosBaseQuery,
  tagTypes: ['Task', 'TaskComments'],
  endpoints(builder) {
    return {
      getTaskList: builder.query<Task[], {
        userId: number;
      }>({
        query(params) {
          return {
            method: 'get',
            url: 'tasks',
            params,
          };
        },
        providesTags: result =>
          result
            ? [
              ...result.map(({ id }) => ({ type: 'Task', id } as const)),
              { type: 'Task', id: 'LIST' },
            ]
            : [{ type: 'Task', id: 'LIST' }],
      }),
      getTask: builder.query<Task, number>({
        query(id) {
          return {
            method: 'get',
            url: `tasks/${id}`,
          };
        },
        providesTags: (result, error, id) => [{ type: 'Task', id }],
      }),
      createTask: builder.mutation<Task, CreateTaskParam>({
        query(task) {
          return {
            method: 'post',
            url: 'tasks',
            data: task,
          };
        },
        invalidatesTags: [
          { type: 'Task', id: 'LIST' },
        ],
      }),
      addTaskComment: builder.mutation<TaskComment, Partial<{
                taskId: string;
                commentText: string;
            }>>({
              query({ taskId, commentText }) {
                return {
                  method: 'post',
                  url: `tasks/${taskId}/comments`,
                  data: {
                    text: commentText,
                  },
                };
              },
              invalidatesTags: (r, e, { taskId }) => [
                { type: 'TaskComments', taskId },
              ],
            }),
      getTaskComments: builder.query<TaskComment[], {taskId: string}>({
        query({ taskId }) {
          return {
            method: 'get',
            url: `tasks/${taskId}/comments`,
          };
        },
        providesTags: (result, error, { taskId }) => [{ type: 'TaskComments', taskId }],
      }),
      removeTaskComment: builder.mutation<TaskComment, Partial<{
                taskId: number;
                commentId: number;
            }>>({
              query({ taskId, commentId }) {
                return {
                  method: 'delete',
                  url: `tasks/${taskId}/comments/${commentId}`,
                };
              },
              invalidatesTags: (r, e, { taskId }) => [
                { type: 'TaskComments', taskId },
              ],
            }),
      updateTask: builder.mutation<Task, UpdateTaskParam>({
        query(task) {
          return {
            method: 'put',
            url: `tasks/${task.id}`,
            data: task,
          };
        },
        invalidatesTags: (r, e, { id }) => [
          { type: 'Task', id },
          { type: 'Task', id: 'LIST' },
        ],
      }),
      deleteTask: builder.mutation<Task, string>({
        query(id) {
          return {
            method: 'delete',
            url: `tasks/${id}`,
          };
        },
        invalidatesTags: [
          { type: 'Task', id: 'LIST' },
        ],
      }),
    };
  },
});

export const {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTaskQuery,
  useGetTaskListQuery,
  useLazyGetTaskQuery,
  useUpdateTaskMutation,
  useAddTaskCommentMutation,
  useGetTaskCommentsQuery,
  useRemoveTaskCommentMutation,
} = taskApi;
