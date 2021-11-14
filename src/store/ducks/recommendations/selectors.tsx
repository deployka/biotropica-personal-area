import { RootState } from '../../store';
import {
  Recommendation,
  RecommendationType,
} from '../recommendation/contracts/state';
import { RecommendationsState } from './contracts/state';

export type SortedRecommendations = Record<
  RecommendationType,
  Record<string, Recommendation[]>
>;

export const selectRecommendationsState = (
  state: RootState
): RecommendationsState => state.recommendations;

export const selectRecommendationsData = (
  state: RootState
): RecommendationsState['recommendations'] =>
  selectRecommendationsState(state).recommendations;

export const selectSortedData = (state: RootState) => {
  const recommendations = Array.from(selectRecommendationsData(state));

  const rec = recommendations.reduce((acc, rec: Recommendation) => {
    if (!acc[rec.type]) {
      acc[rec.type] = {};
    }
    if (!acc[rec.type][rec.specialist_profile.id]) {
      acc[rec.type][rec.specialist_profile.id] = [];
    }
    acc[rec.type][rec.specialist_profile.id].push(rec);
    return acc;
  }, {} as SortedRecommendations);
  return rec;
};

export const selectRecommendationsResponse = (
  state: RootState
): RecommendationsState['response'] =>
  selectRecommendationsState(state).response;

export const selectRecommendationsStatus = (
  state: RootState
): RecommendationsState['status'] => selectRecommendationsState(state).status;

export const selectRecommendationsLoadingStatus = (state: RootState): string =>
  selectRecommendationsState(state).status;
