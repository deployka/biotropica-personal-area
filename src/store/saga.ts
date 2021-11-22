import { all } from 'redux-saga/effects';
import { notificationSaga } from './ducks/notification/sagas';
import { userSaga } from './ducks/user/sagas';
import { chatSaga } from './ducks/chat/sagas';
import { goalsSaga } from './ducks/goals/sagas';
import { goalSaga } from './ducks/goal/sagas';
import { progressSaga } from './ducks/progress/sagas';
import { recommendationSaga } from './ducks/recommendation/sagas';
import { recommendationsSaga } from './ducks/recommendations/sagas';
import { analyzeSaga } from './ducks/analyzes/sagas';
import { specialistSaga } from './ducks/specialist/sagas';
import { specialistsSaga } from './ducks/specialists/sagas';
import { consultationSaga } from './ducks/consultation/sagas';

export default function* rootSaga(): any {
  yield all([
    chatSaga(),
    userSaga(),
    specialistSaga(),
    specialistsSaga(),
    consultationSaga(),
    goalSaga(),
    analyzeSaga(),
    goalsSaga(),
    progressSaga(),
    notificationSaga(),
    recommendationSaga(),
    recommendationsSaga(),
  ]);
}
