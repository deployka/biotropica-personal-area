import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { ProgressActions } from './actionCreators';
import { ProgressActionsType } from './contracts/actionTypes';
import { ProgressState } from './contracts/state';

const initialProgressState: ProgressState = {
  progress: undefined,
  response: undefined,
  status: LoadingStatus.NEVER,
};

export const progressReducer = produce(
  (draft: Draft<ProgressState>, action: ProgressActions) => {
    switch (action.type) {
      case ProgressActionsType.SET_PROGRESS_DATA:
        draft.progress = action.payload;
        draft.status = LoadingStatus.SUCCESS;
        break;

      case ProgressActionsType.SET_PROGRESS_RESPONSE:
        draft.response = action.payload;
        break;

      case ProgressActionsType.SET_LOADING_STATE:
        draft.status = action.payload;
        break;

      default:
        break;
    }
  },
  initialProgressState
);
