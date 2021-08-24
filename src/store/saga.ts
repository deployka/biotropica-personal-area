import { all } from 'redux-saga/effects';
import { notificationSaga } from './ducks/notification/sagas';
import { userSaga } from './ducks/user/sagas';

export default function* rootSaga(): any {
  yield all([userSaga()]);
  yield all([notificationSaga()]);
}
