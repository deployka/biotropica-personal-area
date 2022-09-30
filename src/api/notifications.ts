import { DeleteNotificationDto } from '../@types/dto/notifications/delete.dto';
import { UpdateNotificationDto } from '../@types/dto/notifications/update.dto';
import { Notification } from '../@types/entities/Notification';
import { baseApi } from './base-api';

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<Notification[], void>({
      query: () => ({
        url: '/notifications',
        method: 'GET',
      }),
    }),

    getNow: builder.query<Notification[], void>({
      query: () => ({
        url: '/notifications/now',
        method: 'GET',
      }),
    }),

    updateNotification: builder.mutation<Notification, UpdateNotificationDto>({
      query: dto => ({
        url: '/notifications/update',
        body: dto,
        method: 'PATCH',
      }),
    }),

    deleteNotification: builder.mutation<void, DeleteNotificationDto>({
      query: dto => ({
        url: `/notifications/${dto.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
} = notificationsApi;

export default notificationsApi;
