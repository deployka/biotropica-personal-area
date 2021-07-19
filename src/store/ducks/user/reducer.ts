import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { UserActions } from './actionCreators';
import { UserActionsType } from './contracts/actionTypes';
import { UserState } from './contracts/state';

const initialUserState: UserState = {
  data: undefined,
  errors: undefined,
  response: undefined,
  status: LoadingStatus.NEVER,
};

export const userReducer = produce(
  (draft: Draft<UserState>, action: UserActions) => {
    switch (action.type) {
      case UserActionsType.SET_USER_DATA:
        draft.data = action.payload;
        draft.status = LoadingStatus.SUCCESS;
        draft.errors = undefined;
        break;

      case UserActionsType.SET_USER_ERRORS:
        draft.errors = action.payload;
        draft.status = LoadingStatus.ERROR;
        break;

      case UserActionsType.SET_USER_RESPONSE:
        draft.response = action.payload;
        draft.status = LoadingStatus.SUCCESS;
        break;

      case UserActionsType.SET_LOADING_STATE:
        draft.status = action.payload;
        break;

      default:
        break;
    }
  },
  initialUserState
);
