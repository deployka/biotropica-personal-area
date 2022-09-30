import { BaseEntity } from './BaseEntity';

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

export type Specialization = BaseEntity & {
  title: string;
  key: keyof typeof SpecializationName;
};
