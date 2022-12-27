import { GetAllTasksDto } from '../@types/dto/tasks/getAll.dto';
import { Comment } from '../@types/entities/Comment';
import {
  CompetitionTask,
  CreateCompetitionTask,
  CreateEventTask,
  CreateTrainingTask,
  EventTask,
  SomeTask,
  Task,
  TrainingTask,
} from '../@types/entities/Task';
import { baseApi } from './base-api';

// FIXME: DTO
type UpdateTaskParam = Partial<TrainingTask | EventTask | CompetitionTask>;

// FIXME: DTO
type CreateTaskParam = Partial<
  CreateTrainingTask | CreateEventTask | CreateCompetitionTask
>;

export const taskApi = baseApi.injectEndpoints({
  endpoints(builder) {
    return {
      getTaskList: builder.query<SomeTask[], GetAllTasksDto>({
        query(dto) {
          return {
            method: 'GET',
            url: 'tasks',
            params: dto,
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
            method: 'GET',
            url: `tasks/${id}`,
          };
        },
        providesTags: (result, error, id) => [{ type: 'Task', id }],
      }),
      createTask: builder.mutation<Task, CreateTaskParam>({
        query(task) {
          return {
            method: 'POST',
            url: 'tasks',
            body: task,
          };
        },
        invalidatesTags: [{ type: 'Task', id: 'LIST' }, 'TemplateTask'],
      }),
      addTaskComment: builder.mutation<
        Comment,
        Partial<{
          taskId: string;
          commentText: string;
        }>
      >({
        query({ taskId, commentText }) {
          return {
            method: 'POST',
            url: `tasks/${taskId}/comments`,
            body: {
              text: commentText,
            },
          };
        },
        invalidatesTags: (r, e, { taskId }) => [
          { type: 'TaskComment', taskId },
        ],
      }),
      getTaskComments: builder.query<Comment[], { taskId: string }>({
        query({ taskId }) {
          return {
            method: 'GET',
            url: `tasks/${taskId}/comments`,
          };
        },
        providesTags: (result, error, { taskId }) => [
          { type: 'TaskComment', taskId },
        ],
      }),
      removeTaskComment: builder.mutation<
        Comment,
        Partial<{
          taskId: number;
          commentId: number;
        }>
      >({
        query({ taskId, commentId }) {
          return {
            method: 'DELETE',
            url: `tasks/${taskId}/comments/${commentId}`,
          };
        },
        invalidatesTags: (r, e, { taskId }) => [
          { type: 'TaskComment', taskId },
        ],
      }),
      updateTask: builder.mutation<Task, UpdateTaskParam>({
        query(task) {
          return {
            method: 'PUT',
            url: `tasks/${task.id}`,
            body: task,
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
            method: 'DELETE',
            url: `tasks/${id}`,
          };
        },
        invalidatesTags: [{ type: 'Task', id: 'LIST' }, 'TemplateTask'],
      }),
      changeTemplateName: builder.mutation<SomeTask, string>({
        query(name: string) {
          return {
            method: 'PATCH',
            body: { name },
            url: 'tasks/templates/change-name',
          };
        },
        invalidatesTags: ['TemplateTask'],
      }),
      getTemplatesList: builder.query<SomeTask[], void>({
        query() {
          return {
            method: 'GET',
            url: 'tasks/templates',
          };
        },
        providesTags: ['TemplateTask'],
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
  useGetTemplatesListQuery,
  useChangeTemplateNameMutation,
} = taskApi;
