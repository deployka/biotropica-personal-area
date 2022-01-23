import { RootState } from '../../store';
import { RecommendationState } from './contracts/state';

export const selectRecommendationState = (
  state: RootState,
): RecommendationState => state.recommendation;

export const selectRecommendationData = (
  state: RootState,
): RecommendationState['recommendation'] =>
  selectRecommendationState(state).recommendation;

export const selectRecommendationResponse = (
  state: RootState,
): RecommendationState['response'] => selectRecommendationState(state).response;

export const selectRecommendationStatus = (
  state: RootState,
): RecommendationState['status'] => selectRecommendationState(state).status;

export const selectRecommendationLoadingStatus = (state: RootState): string =>
  selectRecommendationState(state).status;
