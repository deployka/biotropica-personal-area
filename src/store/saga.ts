import {all} from 'redux-saga/effects';
import {notificationSaga} from './ducks/notification/sagas';
import {userSaga} from './ducks/user/sagas';
import {chatSaga} from "./ducks/chat/sagas";

export default function* rootSaga(): any {
    yield all([
        chatSaga(),
        userSaga(),
        notificationSaga()
    ]);
}
