import { all } from 'redux-saga/effects';
import { notificationSaga } from './ducks/notification/sagas';
import { userSaga } from './ducks/user/sagas';
import { goalsSaga } from './ducks/goals/sagas';
import { goalSaga } from './ducks/goal/sagas';
import { progressSaga } from './ducks/progress/sagas';
import { recommendationSaga } from './ducks/recommendation/sagas';
import { recommendationsSaga } from './ducks/recommendations/sagas';
import { analyzeSaga } from './ducks/analyze/sagas';
import { analyzesSaga } from './ducks/analyzes/sagas';
import { specialistSaga } from './ducks/specialist/sagas';
import { specialistsSaga } from './ducks/specialists/sagas';
import { consultationSaga } from './ducks/consultation/sagas';
import { consultationsSaga } from './ducks/consultations/sagas';

export default function* rootSaga() {
  yield all([
    userSaga(),
    specialistSaga(),
    specialistsSaga(),
    consultationSaga(),
    consultationsSaga(),
    goalSaga(),
    analyzeSaga(),
    analyzesSaga(),
    goalsSaga(),
    progressSaga(),
    notificationSaga(),
    recommendationSaga(),
    recommendationsSaga(),
  ]);
}
