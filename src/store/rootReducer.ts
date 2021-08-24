import { combineReducers } from 'redux';
import { userReducer } from './ducks/user/reducer';
import {chatReducer} from "./ducks/chat/reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
});
