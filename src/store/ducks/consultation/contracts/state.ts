import { LoadingStatus, Response } from '../../../types';

export interface Consultation {
  id: number;
  userId: number;
  specialistId: number;
  date: Date | null;
  createdAt: string;
  meetingNumber: number;
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

export interface CreateConsultationData
  extends Pick<Consultation, 'specialistId'> {}
