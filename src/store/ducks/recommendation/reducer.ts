import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { RecommendationActions } from './actionCreators';
import { RecommendationActionsType } from './contracts/actionTypes';
import { RecommendationState } from './contracts/state';

const initialRecommendationState: RecommendationState = {
  recommendation: undefined,
  response: undefined,
  status: LoadingStatus.NEVER,
};

export const recommendationReducer = produce(
  (draft: Draft<RecommendationState>, action: RecommendationActions) => {
    switch (action.type) {
      case RecommendationActionsType.SET_RECOMMENDATION_DATA:
        draft.recommendation = action.payload;
        draft.status = LoadingStatus.SUCCESS;
        break;

      case RecommendationActionsType.SET_RECOMMENDATION_RESPONSE:
        draft.response = action.payload;
        break;

      case RecommendationActionsType.SET_LOADING_STATE:
        draft.status = action.payload;
        break;

      default:
        break;
    }
  },
  initialRecommendationState
);
