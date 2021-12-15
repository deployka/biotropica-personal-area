import {
  FetchRecommendationsDataActionInterface,
  SetRecommendationsDataActionInterface,
  SetRecommendationsLoadingStatusActionInterface,
  SetRecommendationsResponseActionInterface,
  RecommendationsActionsType,
} from './contracts/actionTypes';
import { RecommendationsState } from './contracts/state';

export const fetchRecommendationsData = (
  payload: number
): FetchRecommendationsDataActionInterface => ({
  type: RecommendationsActionsType.FETCH_RECOMMENDATIONS_DATA,
  payload,
});

export const setRecommendationsLoadingStatus = (
  payload: RecommendationsState['status']
): SetRecommendationsLoadingStatusActionInterface => ({
  type: RecommendationsActionsType.SET_LOADING_STATE,
  payload,
});

export const setRecommendationsData = (
  payload: RecommendationsState['recommendations']
): SetRecommendationsDataActionInterface => ({
  type: RecommendationsActionsType.SET_RECOMMENDATIONS_DATA,
  payload,
});

export const setRecommendationsResponse = (
  payload: RecommendationsState['response']
): SetRecommendationsResponseActionInterface => ({
  type: RecommendationsActionsType.SET_RECOMMENDATIONS_RESPONSE,
  payload,
});

export type RecommendationsActions =
  | SetRecommendationsDataActionInterface
  | SetRecommendationsLoadingStatusActionInterface
  | SetRecommendationsResponseActionInterface
  | SetRecommendationsDataActionInterface;
