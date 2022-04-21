import { userReducer } from './ducks/user/reducer';
import { goalReducer } from './ducks/goal/reducer';
import { goalsReducer } from './ducks/goals/reducer';
import { progressReducer } from './ducks/progress/reducer';
import { recommendationsReducer } from './ducks/recommendations/reducer';
import { recommendationReducer } from './ducks/recommendation/reducer';
import { analyzesReducer } from './ducks/analyzes/reducer';
import { analyzeReducer } from './ducks/analyze/reducer';
import { specialistReducer } from './ducks/specialist/reducer';
import { specialistsReducer } from './ducks/specialists/reducer';
import { consultationReducer } from './ducks/consultation/reducer';
import { consultationsReducer } from './ducks/consultations/reducer';
import { taskApi } from './rtk/requests/tasks';
import tasksPageSlice from './rtk/slices/tasksPageSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { notificationReducer } from './ducks/notification/reducer';
import { recommendationApi } from './rtk/requests/recommendations';
import { specializationApi } from './rtk/requests/specializations';
import authApi from './rtk/requests/auth';
import authSlice from './rtk/slices/authSlice';
import users from './rtk/slices/users';

export const rootReducer = combineReducers({
  user: userReducer,
  specialist: specialistReducer,
  specialists: specialistsReducer,
  consultation: consultationReducer,
  consultations: consultationsReducer,
  goal: goalReducer,
  goals: goalsReducer,
  progress: progressReducer,
  recommendations: recommendationsReducer,
  recommendation: recommendationReducer,
  analyze: analyzeReducer,
  analyzes: analyzesReducer,
  notification: notificationReducer,
  [taskApi.reducerPath]: taskApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  tasksPageSlice: tasksPageSlice,
  authSlice,
  [recommendationApi.reducerPath]: recommendationApi.reducer,
  [specializationApi.reducerPath]: specializationApi.reducer,
  users: users,
});
