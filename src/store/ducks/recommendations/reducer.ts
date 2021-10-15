import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { RecommendationsActions } from './actionCreators';
import { RecommendationsActionsType } from './contracts/actionTypes';
import { RecommendationsState } from './contracts/state';

const initialRecommendationsState: RecommendationsState = {
  recommendations: undefined,
  response: undefined,
  status: LoadingStatus.NEVER,
};

export const recommendationsReducer = produce(
  (draft: Draft<RecommendationsState>, action: RecommendationsActions) => {
    switch (action.type) {
      case RecommendationsActionsType.SET_RECOMMENDATIONS_DATA:
        draft.recommendations = action.payload;
        draft.status = LoadingStatus.SUCCESS;
        break;

      case RecommendationsActionsType.SET_RECOMMENDATIONS_RESPONSE:
        draft.response = action.payload;
        break;

      case RecommendationsActionsType.SET_LOADING_STATE:
        draft.status = action.payload;
        break;

      default:
        break;
    }
  },
  initialRecommendationsState
);
