import { ISelect } from '../../../../shared/Form/Select/SelectCustom';
import { LoadingStatus } from '../../../types';
import { User } from '../../user/contracts/state';

export interface SpecialistUser {
  id: number;
  price: number;
  specializations: ISelect<string>[];
  experience: string;
  education: string;
  user: User;
}

export interface Specialist
  extends Omit<SpecialistUser, 'user' | 'specializations'>,
    Pick<SpecialistUser['user'], 'profile_photo' | 'name'> {
  specializations: string;
  userId: number;
}

export interface SpecialistState {
  specialist: SpecialistUser | undefined;
  status: LoadingStatus;
  response: any;
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
