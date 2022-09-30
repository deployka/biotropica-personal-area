import { Recommendation } from '../../entities/Recommendation';

export type DeleteRecommendationDto = {
  id: Recommendation['id'];
};
