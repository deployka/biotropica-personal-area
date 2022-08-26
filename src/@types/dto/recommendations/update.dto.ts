import { Recommendation } from '../../entities/Recommendation';

export type UpdateRecommendationDto = {
  id: Recommendation['id'];
  title: string;
  description: string;
};
