import { LoadingStatus, Response } from '../../../types';
import { User } from '../../user/contracts/state';

export interface SpecialistUser {
  id: number;
  price: number;
  specializations: Array<keyof typeof SpecializationName>;
  experience: string;
  education: string;
  user: User;
}

export interface Specialist
  extends Omit<SpecialistUser, 'user' | 'specializations'>,
    Pick<SpecialistUser['user'], 'profilePhoto' | 'name'> {
  specializations: string;
  userId: number;
}

export interface SpecialistState {
  specialist: SpecialistUser | undefined;
  status: LoadingStatus;
  response: Response | undefined;
}

export const SpecializationName = {
  TRAINER: 'Тренер',
  NUTRITIONIST: 'Диетолог',
  NUTRITSIOLOG: 'Нутрициолог',
  ENDOCRINOLOGIST: 'Эндокринолог',
  PEDIATRICIAN: 'Педиатр',
  TRAUMATOLOGIST_ORTHOPEDIST: 'Травматолог-ортопед',
  THERAPIST: 'Терапевт',
  PHYSICIAN: 'Врач ЛФК и спортивной медицины',
  ALLERGIST_IMMUNOLOGIST: 'Аллерголог-иммунолог',
};
