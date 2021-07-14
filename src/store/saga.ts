import { all } from 'redux-saga/effects';
import { userSaga } from './ducks/user/sagas';

export default function* rootSaga(): any {
  yield all([userSaga()]);
}
