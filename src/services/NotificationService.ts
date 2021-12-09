import { AxiosResponse } from 'axios';
import $api from '../http';
import {
  UpdateNotificationData,
} from '../store/ducks/notification/contracts/state';

interface Response {
  status: string;
  data: INotification;
}

export default class NotificationService {
  static route: string = 'notifications';

  static async getAll(): Promise<INotification[]> {
    return (await $api.get(`/${NotificationService.route}/`)).data;
  }

  static async getNow(): Promise<INotification[]> {
    return (await $api.get(`/${NotificationService.route}/now`)).data;
  }

  static async update(
    payload: UpdateNotificationData
  ): Promise<AxiosResponse<Response>> {
    return await $api.patch<Response>(
      `/${NotificationService.route}/update`,
      payload
    );
  }
}
