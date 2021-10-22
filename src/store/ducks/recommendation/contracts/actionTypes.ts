import { Action } from 'redux';
import { LoadingStatus } from '../../../types';
import {
  UpdateRecommendationData,
  Recommendation,
  CreateRecommendationData,
} from './state';

export enum RecommendationActionsType {
  SET_RECOMMENDATION_DATA = 'recommendation/SET_RECOMMENDATION_DATA',
  SET_RECOMMENDATIONS_DATA = 'recommendation/SET_RECOMMENDATIONS_DATA',
  SET_LOADING_STATE = 'recommendation/SET_LOADING_STATE',
  SET_RECOMMENDATION_RESPONSE = 'recommendation/SET_RECOMMENDATION_RESPONSE',
  FETCH_RECOMMENDATION_DATA = 'recommendation/FETCH_RECOMMENDATION_DATA',
  CREATE_RECOMMENDATION_DATA = 'recommendation/CREATE_RECOMMENDATION_DATA',
  FETCH_RECOMMENDATIONS_DATA = 'recommendation/FETCH_RECOMMENDATIONS_DATA',
  FETCH_UPDATE_RECOMMENDATION = 'recommendation/FETCH_UPDATE_RECOMMENDATION',
  FETCH_DELETE_RECOMMENDATION = 'recommendation/FETCH_DELETE_RECOMMENDATION',
}

export interface UpdateRecommendationActionInterface
  extends Action<RecommendationActionsType> {
  type: RecommendationActionsType.FETCH_UPDATE_RECOMMENDATION;
  payload: UpdateRecommendationData;
}

export interface DeleteRecommendationActionInterface
  extends Action<RecommendationActionsType> {
  type: RecommendationActionsType.FETCH_DELETE_RECOMMENDATION;
  payload: number;
}

export interface FetchRecommendationDataActionInterface
  extends Action<RecommendationActionsType> {
  type: RecommendationActionsType.FETCH_RECOMMENDATION_DATA;
  payload: number;
}

export interface CreateRecommendationDataActionInterface
  extends Action<RecommendationActionsType> {
  type: RecommendationActionsType.CREATE_RECOMMENDATION_DATA;
  payload: CreateRecommendationData;
}

export interface SetRecommendationResponseActionInterface
  extends Action<RecommendationActionsType> {
  type: RecommendationActionsType.SET_RECOMMENDATION_RESPONSE;
  payload: any;
}

export interface SetRecommendationDataActionInterface
  extends Action<RecommendationActionsType> {
  type: RecommendationActionsType.SET_RECOMMENDATION_DATA;
  payload: Recommendation | undefined;
}

export interface SetRecommendationLoadingStatusActionInterface
  extends Action<RecommendationActionsType> {
  type: RecommendationActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}
