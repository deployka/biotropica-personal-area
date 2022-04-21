import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { AnalyzesActions } from './actionCreators';
import { AnalyzesActionsType } from './contracts/actionTypes';
import { AnalyzesState } from './contracts/state';

const initialAnalyzesState: AnalyzesState = {
  analyzes: [],
  response: undefined,
  status: LoadingStatus.NEVER,
};

export const analyzesReducer = produce(
  (draft: Draft<AnalyzesState>, action: AnalyzesActions) => {
    switch (action.type) {
      case AnalyzesActionsType.SET_ANALYZES_DATA:
        draft.analyzes = action.payload || [];
        draft.status = LoadingStatus.SUCCESS;
        break;

      case AnalyzesActionsType.SET_ANALYZES_RESPONSE:
        draft.response = action.payload;
        break;

      case AnalyzesActionsType.SET_LOADING_STATE:
        draft.status = action.payload;
        break;

      default:
        break;
    }
  },
  initialAnalyzesState,
);
