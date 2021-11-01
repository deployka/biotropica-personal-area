import { ReactNode } from 'react';
import { LoadingStatus } from '../../../types';

export interface Recommendation {
  id: number;
  type: RecommendationType;
  specialist_profile: SpecialistProfile;
  content: ReactNode;
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

export type SpecialistProfile = {
  id: number;
  name: string;
  position: string;
  profile_photo: string;
};

export interface UpdateRecommendationData extends Partial<Recommendation> {}
export interface CreateRecommendationData
  extends Omit<Recommendation, 'id' | 'createdAt'> {}
