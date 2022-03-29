import { LoadingStatus, Response } from '../../../types';

export interface Consultation {
  id: number;
  userId: number;
  specialistId: number;
  date: Date | null;
  createdAt: string;
  meetingNumber: string;
  meetingPassword: string;
}

export interface ClosestConsultation extends Consultation {
  date: Date;
}

export interface ConsultationState {
  consultation: Consultation | undefined;
  closestConsultation: ClosestConsultation | undefined;
  status: LoadingStatus;
  response: Response | undefined;
}

export type CreateConsultationData = Pick<Consultation, 'specialistId'>;
