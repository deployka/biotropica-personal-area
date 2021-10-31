import {
  FetchRecommendationDataActionInterface,
  SetRecommendationDataActionInterface,
  SetRecommendationLoadingStatusActionInterface,
  SetRecommendationResponseActionInterface,
  RecommendationActionsType,
  CreateRecommendationDataActionInterface,
  UpdateRecommendationActionInterface,
  DeleteRecommendationActionInterface,
} from './contracts/actionTypes';
import {
  CreateRecommendationData,
  RecommendationState,
  UpdateRecommendationData,
} from './contracts/state';

export const fetchRecommendationData = (
  payload: number
): FetchRecommendationDataActionInterface => ({
  type: RecommendationActionsType.FETCH_RECOMMENDATION_DATA,
  payload,
});

export const createRecommendationData = (
  payload: CreateRecommendationData
): CreateRecommendationDataActionInterface => ({
  type: RecommendationActionsType.CREATE_RECOMMENDATION_DATA,
  payload,
});

export const updateRecommendationData = (
  payload: UpdateRecommendationData
): UpdateRecommendationActionInterface => ({
  type: RecommendationActionsType.FETCH_UPDATE_RECOMMENDATION,
  payload,
});

export const deleteRecommendationData = (
  payload: number
): DeleteRecommendationActionInterface => ({
  type: RecommendationActionsType.FETCH_DELETE_RECOMMENDATION,
  payload,
});

export const setRecommendationLoadingStatus = (
  payload: RecommendationState['status']
): SetRecommendationLoadingStatusActionInterface => ({
  type: RecommendationActionsType.SET_LOADING_STATE,
  payload,
});

export const setRecommendationData = (
  payload: RecommendationState['recommendation']
): SetRecommendationDataActionInterface => ({
  type: RecommendationActionsType.SET_RECOMMENDATION_DATA,
  payload,
});

export const setRecommendationResponse = (
  payload: RecommendationState['response']
): SetRecommendationResponseActionInterface => ({
  type: RecommendationActionsType.SET_RECOMMENDATION_RESPONSE,
  payload,
});

export type RecommendationActions =
  | SetRecommendationDataActionInterface
  | SetRecommendationLoadingStatusActionInterface
  | SetRecommendationResponseActionInterface;
