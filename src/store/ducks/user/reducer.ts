import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { UserActions } from './actionCreators';
import { UserActionsType } from './contracts/actionTypes';
import { UserState } from './contracts/state';

const initialUserState: UserState = {
  user: undefined,
  currentUser: undefined,
  response: undefined,
  status: LoadingStatus.NEVER,
};

export const userReducer = produce(
  (draft: Draft<UserState>, action: UserActions) => {
    switch (action.type) {
      case UserActionsType.SET_USER_DATA:
        draft.currentUser = action.payload;
        draft.status = LoadingStatus.SUCCESS;
        break;

      case UserActionsType.SET_USER_DATA_BY_ID:
        draft.user = action.payload;
        draft.status = LoadingStatus.SUCCESS;
        break;

      case UserActionsType.SET_USER_RESPONSE:
        draft.response = action.payload;
        break;

      case UserActionsType.SET_LOADING_STATE:
        draft.status = action.payload;
        break;

      default:
        break;
    }
  },
  initialUserState,
);
