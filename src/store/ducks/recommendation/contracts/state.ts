import { LoadingStatus, Response } from '../../../types';

export interface Recommendation {
  id: number;
  type: RecommendationType;
  specialistProfile: SpecialistProfile;
  createdAt: string;
  title: string;
  description: string;
}

export interface RecommendationState {
  recommendation: Recommendation | undefined;
  status: LoadingStatus;
  response: Response | undefined;
}

export enum RecommendationType {
  NUTRITION = 'NUTRITION',
  WORKOUT = 'WORKOUT',
}

export type SpecialistProfile = {
  id: number;
  name: string;
  position: string;
  profilePhoto: string;
};

export type UpdateRecommendationData = Partial<Recommendation>;
export type CreateRecommendationData = Omit<Recommendation, 'id' | 'createdAt'>;
