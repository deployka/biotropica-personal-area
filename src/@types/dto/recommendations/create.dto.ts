import { Specialization } from '../../entities/Specialization';

export type CreateRecommendationDto = {
  userId: number;
  title: string;
  description: string;
  specializationId: Specialization['id'];
};
