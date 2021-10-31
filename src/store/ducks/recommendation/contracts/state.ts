import { LoadingStatus } from '../../../types';

export interface Recommendation {
  id: number;
  type: RecommendationType;
  createdAt: string;
}

export interface RecommendationState {
  recommendation: Recommendation | undefined;
  status: LoadingStatus;
  response: any;
}

export enum RecommendationType {
  NUTRITION = 'NUTRITION',
  WORKOUT = 'WORKOUT',
}

export interface UpdateRecommendationData extends Partial<Recommendation> {}
export interface CreateRecommendationData
  extends Omit<Recommendation, 'id' | 'createdAt'> {}
