import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { NotificationActions } from './actionCreators';
import { NotificationActionsType } from './contracts/actionTypes';
import { NotificationState } from './contracts/state';

const initialNotificationState: NotificationState = {
  notification: null,
  response: null,
  status: LoadingStatus.NEVER,
};

export const notificationReducer = produce(
  (draft: Draft<NotificationState>, action: NotificationActions) => {
    switch (action.type) {
      case NotificationActionsType.SET_NOTIFICATION_DATA:
        draft.notification = action.payload;
        draft.status = LoadingStatus.SUCCESS;
        break;

      case NotificationActionsType.SET_NOTIFICATION_RESPONSE:
        draft.response = action.payload;
        break;

      case NotificationActionsType.SET_LOADING_STATE:
        draft.status = action.payload;
        break;

      default:
        break;
    }
  },
  initialNotificationState
);
