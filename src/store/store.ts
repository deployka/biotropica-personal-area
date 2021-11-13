import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { NotificationState } from './ducks/notification/contracts/state';
import { UserState } from './ducks/user/contracts/state';

import { rootReducer } from './rootReducer';

import rootSaga from './saga';
import { ChatState } from './ducks/chat/contracts/state';
import { GoalState } from './ducks/goal/contracts/state';
import { GoalsState } from './ducks/goals/contracts/state';
import { ProgressState } from './ducks/progress/contracts/state';
import { RecommendationState } from './ducks/recommendation/contracts/state';
import { RecommendationsState } from './ducks/recommendations/contracts/state';
import { AnalyzeState } from './ducks/analyzes/contracts/state';

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

export interface RootState {
  user: UserState;
  goals: GoalsState;
  goal: GoalState;
  progress: ProgressState;
  recommendation: RecommendationState;
  recommendations: RecommendationsState;
  analyze: AnalyzeState;
  notification: NotificationState;
  chat: ChatState;
}

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
