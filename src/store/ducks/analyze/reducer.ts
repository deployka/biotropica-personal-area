import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { AnalyzeActions } from './actionCreators';
import { AnalyzeActionsType } from './contracts/actionTypes';
import { AnalyzeAnswerState } from './contracts/state';

const initialAnalyzeState: AnalyzeAnswerState = {
  analyze: undefined,
  response: undefined,
  status: LoadingStatus.NEVER,
};

export const analyzeReducer = produce(
  (draft: Draft<AnalyzeAnswerState>, action: AnalyzeActions) => {
    switch (action.type) {
      case AnalyzeActionsType.SET_ANALYZE_DATA:
        draft.analyze = action.payload;
        draft.status = LoadingStatus.SUCCESS;
        break;

      case AnalyzeActionsType.SET_ANALYZE_RESPONSE:
        draft.response = action.payload;
        break;

      case AnalyzeActionsType.SET_LOADING_STATE:
        draft.status = action.payload;
        break;

      default:
        break;
    }
  },
  initialAnalyzeState
);
