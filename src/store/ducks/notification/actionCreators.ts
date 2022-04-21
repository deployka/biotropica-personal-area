import {
  FetchUpdateNotificationActionInterface,
  FetchNotificationDataActionInterface,
  SetNotificationDataActionInterface,
  SetNotificationLoadingStatusActionInterface,
  SetNotificationResponseActionInterface,
  NotificationActionsType,
} from './contracts/actionTypes';
import { NotificationState, UpdateNotificationData } from './contracts/state';

export const fetchNotificationData =
  (): FetchNotificationDataActionInterface => ({
    type: NotificationActionsType.FETCH_NOTIFICATION_DATA,
  });

export const fetchUpdateNotification = (
  payload: UpdateNotificationData,
): FetchUpdateNotificationActionInterface => ({
  type: NotificationActionsType.FETCH_UPDATE_NOTIFICATION,
  payload,
});

export const setNotificationLoadingStatus = (
  payload: NotificationState['status'],
): SetNotificationLoadingStatusActionInterface => ({
  type: NotificationActionsType.SET_LOADING_STATE,
  payload,
});

export const setNotificationData = (
  payload: NotificationState['notification'],
): SetNotificationDataActionInterface => ({
  type: NotificationActionsType.SET_NOTIFICATION_DATA,
  payload,
});

export const setNotificationResponse = (
  payload: NotificationState['response'],
): SetNotificationResponseActionInterface => ({
  type: NotificationActionsType.SET_NOTIFICATION_RESPONSE,
  payload,
});

export type NotificationActions =
  | SetNotificationDataActionInterface
  | SetNotificationLoadingStatusActionInterface
  | SetNotificationResponseActionInterface;
