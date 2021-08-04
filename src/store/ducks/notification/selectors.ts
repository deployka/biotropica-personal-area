import { RootState } from '../../store';
import { NotificationState } from './contracts/state';

export const selectNotificationState = (state: RootState): NotificationState =>
  state.notification;

export const selectNotificationData = (
  state: RootState
): NotificationState['notification'] =>
  selectNotificationState(state).notification;

export const selectNotificationResponse = (
  state: RootState
): NotificationState['response'] => selectNotificationState(state).response;

export const selectIsAuth = (state: RootState): boolean =>
  !!window.localStorage.getItem('token');

export const selectNotificationStatus = (
  state: RootState
): NotificationState['status'] => selectNotificationState(state).status;

export const selectNotificationLoadingStatus = (state: RootState): string =>
  selectNotificationState(state).status;
