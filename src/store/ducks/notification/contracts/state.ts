import { LoadingStatus } from '../../../types';

export interface Notification {
  text: string;
  date: string;
  taskLink: string;
  createdAt: string;
}

export interface NotificationState {
  notification: Notification | null;
  status: LoadingStatus;
  response: any;
}

export interface UpdateNotificationData {
  text: string;
  month: string;
  day: string;
  belate: string;
  units: string;
  taskLink: string;
}
