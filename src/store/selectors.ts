import { RootState } from './store';
import { LoadingStatus } from './types';

export const selectGlobalLoadingStatus = (state: RootState): boolean => {
  const loadingUser = state.user.status;
  const loadingGoals = state.goals.status;
  const loadingGoal = state.goal.status;
  const loadingProgress = state.progress.status;
  const loadingRecommendations = state.recommendations.status;
  const loadingAnalyze = state.analyze.status;
  const loadingAnalyzes = state.analyzes.status;
  const loadingSpecialists = state.specialists.status;
  const loadingSpecialist = state.specialist.status;
  return (
    loadingUser === LoadingStatus.LOADING ||
    loadingSpecialist === LoadingStatus.LOADING ||
    loadingSpecialists === LoadingStatus.LOADING ||
    loadingGoals === LoadingStatus.LOADING ||
    loadingGoal === LoadingStatus.LOADING ||
    loadingProgress === LoadingStatus.LOADING ||
    loadingRecommendations === LoadingStatus.LOADING ||
    loadingAnalyze === LoadingStatus.LOADING ||
    loadingAnalyzes === LoadingStatus.LOADING
  );
};
