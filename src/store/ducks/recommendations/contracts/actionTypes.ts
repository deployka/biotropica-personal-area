import { Action } from 'redux';
import { LoadingStatus } from '../../../types';
import { Recommendation } from '../../recommendation/contracts/state';

export enum RecommendationsActionsType {
  SET_RECOMMENDATIONS_DATA = 'recommendations/SET_RECOMMENDATIONS_DATA',
  SET_LOADING_STATE = 'recommendations/SET_LOADING_STATE',
  SET_RECOMMENDATIONS_RESPONSE = 'recommendations/SET_RECOMMENDATIONS_RESPONSE',
  FETCH_RECOMMENDATIONS_DATA = 'recommendations/FETCH_RECOMMENDATIONS_DATA',
}

export interface FetchRecommendationsDataActionInterface
  extends Action<RecommendationsActionsType> {
  type: RecommendationsActionsType.FETCH_RECOMMENDATIONS_DATA;
}

export interface SetRecommendationsResponseActionInterface
  extends Action<RecommendationsActionsType> {
  type: RecommendationsActionsType.SET_RECOMMENDATIONS_RESPONSE;
  payload: any;
}

export interface SetRecommendationsDataActionInterface
  extends Action<RecommendationsActionsType> {
  type: RecommendationsActionsType.SET_RECOMMENDATIONS_DATA;
  payload: Recommendation[] | undefined;
}

export interface SetRecommendationsLoadingStatusActionInterface
  extends Action<RecommendationsActionsType> {
  type: RecommendationsActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}
