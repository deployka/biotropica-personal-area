import { Specialization } from '../../entities/Specialization';

export type UpdateSpecialistDto = Partial<{
  specializations: Specialization[];
  experience: string;
  education: string;
}>;
