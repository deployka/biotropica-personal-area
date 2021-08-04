import { Action } from 'redux';
import { LoadingStatus } from '../../../types';
import {
  UpdateNotificationData,
  Notification,
  NotificationState,
} from './state';

export enum NotificationActionsType {
  SET_NOTIFICATION_DATA = 'notification/SET_NOTIFICATION_DATA',
  SET_LOADING_STATE = 'notification/SET_LOADING_STATE',
  SET_NOTIFICATION_RESPONSE = 'notification/SET_NOTIFICATION_RESPONSE',
  FETCH_NOTIFICATION_DATA = 'notification/FETCH_NOTIFICATION_DATA',
  FETCH_SIGN_IN = 'notification/FETCH_SIGN_IN',
  FETCH_SIGN_UP = 'notification/FETCH_SIGN_UP',
  FETCH_SIGN_OUT = 'notification/FETCH_SIGN_OUT',
  FETCH_REFRESH = 'notification/FETCH_REFRESH',
  FETCH_CHANGE_PASSWORD = 'notification/FETCH_CHANGE_PASSWORD',
  FETCH_FORGOT_PASSWORD = 'notification/FETCH_FORGOT_PASSWORD',
  FETCH_RESTORE_PASSWORD = 'notification/FETCH_RESTORE_PASSWORD',
  FETCH_UPDATE_NOTIFICATION = 'notification/FETCH_UPDATE_NOTIFICATION',
}

export interface FetchSignoutActionInterface
  extends Action<NotificationActionsType> {
  type: NotificationActionsType.FETCH_SIGN_OUT;
}

export interface FetchUpdateNotificationActionInterface
  extends Action<NotificationActionsType> {
  type: NotificationActionsType.FETCH_UPDATE_NOTIFICATION;
  payload: UpdateNotificationData;
}

export interface FetchNotificationDataActionInterface
  extends Action<NotificationActionsType> {
  type: NotificationActionsType.FETCH_NOTIFICATION_DATA;
}

export interface SetNotificationResponseActionInterface
  extends Action<NotificationActionsType> {
  type: NotificationActionsType.SET_NOTIFICATION_RESPONSE;
  payload: any;
}

export interface SetNotificationDataActionInterface
  extends Action<NotificationActionsType> {
  type: NotificationActionsType.SET_NOTIFICATION_DATA;
  payload: NotificationState['notification'];
}

export interface SetNotificationLoadingStatusActionInterface
  extends Action<NotificationActionsType> {
  type: NotificationActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}
