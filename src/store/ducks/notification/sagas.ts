import { call, put, takeLatest } from 'redux-saga/effects';
import AuthService from '../../../services/AuthService';
import NotificationService from '../../../services/NotificationService';
import { LoadingStatus } from '../../types';
import {
  setNotificationData,
  setNotificationLoadingStatus,
  setNotificationResponse,
} from './actionCreators';
import {
  FetchUpdateNotificationActionInterface,
  FetchNotificationDataActionInterface,
  NotificationActionsType,
} from './contracts/actionTypes';

// export function* fetchNotificationDataRequest({}: FetchNotificationDataActionInterface) {
//   yield put(setNotificationLoadingStatus(LoadingStatus.LOADING));
//   const { data, status } = yield call(NotificationService.getMe);
//   if (status === 200) {
//     yield put(setNotificationData(data));
//     yield put(setNotificationLoadingStatus(LoadingStatus.SUCCESS));
//   } else {
//     yield put(setNotificationLoadingStatus(LoadingStatus.ERROR));
//   }
// }

export function * fetchUpdateNotificationRequest({
  payload,
}: FetchUpdateNotificationActionInterface) {
  yield put(setNotificationLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(NotificationService.update, payload);
  if (status === 200) {
    yield put(setNotificationData(data));
    yield put(
      setNotificationResponse({
        statusCode: status,
        message: 'Данные обновлены',
      }),
    );
    yield put(setNotificationLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setNotificationResponse(data));
    yield put(setNotificationLoadingStatus(LoadingStatus.ERROR));
  }
}

export function * notificationSaga() {
  // yield takeLatest(
  //   NotificationActionsType.FETCH_NOTIFICATION_DATA,
  //   fetchNotificationDataRequest
  // );

  yield takeLatest(
    NotificationActionsType.FETCH_UPDATE_NOTIFICATION,
    fetchUpdateNotificationRequest,
  );
}
