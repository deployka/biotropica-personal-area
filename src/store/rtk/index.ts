import {
  combineReducers,
  configureStore,
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import usersApi from './requests/users';
import userApi from './requests/user';
import avatarApi from './requests/avatar';
import userReducer from './slices/user';
import usersReducer from './slices/users';
import avatarReducer from './slices/avatar';
import authSlice from './slices/authSlice';
import authApi from './requests/auth';
import { taskApi } from './requests/tasks';
import tasksPageSlice from './slices/tasksPageSlice';
import { specializationApi } from './requests/specializations';
import { recommendationApi } from './requests/recommendations';
import userEventsApi from './requests/user-events';

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [userEventsApi.reducerPath]: userEventsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [avatarApi.reducerPath]: avatarApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
  [specializationApi.reducerPath]: specializationApi.reducer,
  [recommendationApi.reducerPath]: recommendationApi.reducer,
  authSlice: authSlice,
  tasksPageSlice: tasksPageSlice,
  user: userReducer,
  users: usersReducer,
  avatar: avatarReducer,
});

const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => next => action => {
    if (isRejectedWithValue(action)) {
      console.log(action, ' middleware ');
      console.log(action.error.message, ' error message ');
      console.warn(action.payload.status, ' Current state ');
      console.warn(action.payload.data?.message, ' error message ');
      console.warn(' Middleware intercepted ');
    }

    return next(action);
  };

const middlewareHandler = (getDefaultMiddleware: any) => {
  const middlewareList = [
    rtkQueryErrorLogger,
    ...getDefaultMiddleware().concat(
      avatarApi.middleware,
      userApi.middleware,
      usersApi.middleware,
      avatarApi.middleware,
      taskApi.middleware,
      specializationApi.middleware,
      recommendationApi.middleware,
      userEventsApi.middleware,
    ),
  ];

  return middlewareList;
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    middlewareHandler(getDefaultMiddleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store;
