import { all } from 'redux-saga/effects';
import { notificationSaga } from './ducks/notification/sagas';
import { userSaga } from './ducks/user/sagas';
import { chatSaga } from './ducks/chat/sagas';
import { goalsSaga } from './ducks/goals/sagas';
import { goalSaga } from './ducks/goal/sagas';

export default function* rootSaga(): any {
  yield all([
    chatSaga(),
    userSaga(),
    goalSaga(),
    goalsSaga(),
    notificationSaga(),
  ]);
}
