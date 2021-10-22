import { combineReducers } from 'redux';
import { userReducer } from './ducks/user/reducer';
import { chatReducer } from './ducks/chat/reducer';
import { goalReducer } from './ducks/goal/reducer';
import { goalsReducer } from './ducks/goals/reducer';
import { progressReducer } from './ducks/progress/reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  goal: goalReducer,
  goals: goalsReducer,
  progress: progressReducer,
});
