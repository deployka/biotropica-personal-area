import { RootState } from '../../store';
import { RecommendationsState } from './contracts/state';

export const selectRecommendationsState = (
  state: RootState
): RecommendationsState => state.recommendations;

export const selectRecommendationsData = (
  state: RootState
): RecommendationsState['recommendations'] =>
  selectRecommendationsState(state).recommendations;

export const selectRecommendationsResponse = (
  state: RootState
): RecommendationsState['response'] =>
  selectRecommendationsState(state).response;

export const selectRecommendationsStatus = (
  state: RootState
): RecommendationsState['status'] => selectRecommendationsState(state).status;

export const selectRecommendationsLoadingStatus = (state: RootState): string =>
  selectRecommendationsState(state).status;
