import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { NotificationState } from './ducks/notification/contracts/state';
import { UserState } from './ducks/user/contracts/state';

import { rootReducer } from './rootReducer';

import rootSaga from './saga';
import { GoalState } from './ducks/goal/contracts/state';
import { GoalsState } from './ducks/goals/contracts/state';
import { ProgressState } from './ducks/progress/contracts/state';
import { RecommendationState } from './ducks/recommendation/contracts/state';
import { RecommendationsState } from './ducks/recommendations/contracts/state';
import { AnalyzeAnswerState } from './ducks/analyze/contracts/state';
import { AnalyzesState } from './ducks/analyzes/contracts/state';
import { SpecialistState } from './ducks/specialist/contracts/state';
import { SpecialistsState } from './ducks/specialists/contracts/state';
import { ConsultationState } from './ducks/consultation/contracts/state';
import { ConsultationsState } from './ducks/consultations/contracts/state';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { taskApi } from './rtk/requests/tasks';
import { recommendationApi } from './rtk/requests/recommendations';
import { specializationApi } from './rtk/requests/specializations';
import authApi from './rtk/requests/auth';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const sagaMiddleware = createSagaMiddleware();

// export interface RootState {
//   user: UserState;
//   specialist: SpecialistState;
//   specialists: SpecialistsState;
//   consultation: ConsultationState;
//   consultations: ConsultationsState;
//   goals: GoalsState;
//   goal: GoalState;
//   progress: ProgressState;
//   recommendation: RecommendationState;
//   recommendations: RecommendationsState;
//   analyze: AnalyzeAnswerState;
//   analyzes: AnalyzesState;
//   notification: NotificationState;
// }

// export const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(sagaMiddleware)),
// );

const middlewareHandler = (getDefaultMiddleware: any) => {
  return [
    ...getDefaultMiddleware().concat(
      taskApi.middleware,
      recommendationApi.middleware,
      specializationApi.middleware,
      authApi.middleware,
      sagaMiddleware,
    ),
  ];
};

export const store = configureStore({
  reducer: rootReducer,
  // composeEnhancers(applyMiddleware(sagaMiddleware)),
  middleware: getDefaultMiddleware =>
    middlewareHandler(getDefaultMiddleware),
});

sagaMiddleware.run(rootSaga);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store;
