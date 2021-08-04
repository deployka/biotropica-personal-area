import { AxiosResponse } from 'axios';
import $api from '../http';
import {
  Notification,
  UpdateNotificationData,
} from '../store/ducks/notification/contracts/state';

interface Response {
  status: string;
  data: Notification;
}

export default class NotificationService {
  static route: string = 'notifications';

  static async update(
    payload: UpdateNotificationData
  ): Promise<AxiosResponse<Response>> {
    return await $api.patch<Response>(
      `/${NotificationService.route}/update`,
      payload
    );
  }
}
