import { BaseEntity } from './BaseEntity';
import { Client } from './Client';
import { Specialist } from './Specialist';

export type Consultation = BaseEntity & {
  date: Date;
  specialist: Specialist;
  uuid: Uuid;
  user: Client;
  specialistId: UniqueId;
  userId: UniqueId;
  meetingNumber: string;
  meetingPassword: string;
  isPaid: boolean;
  isFree: boolean;
};

export type ClosestConsultation = Omit<Consultation, 'date'> & {
  date: Date;
};
