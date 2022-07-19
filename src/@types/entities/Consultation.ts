import { BaseEntity } from './BaseEntity';
import { Client } from './Client';
import { Specialist } from './Specialist';

export type Consultation = BaseEntity & {
  date: DateTimeString;
  specialist: Specialist;
  user: Client;
  specialistId: UniqueId;
  userId: UniqueId;
  meetingNumber: number;
  meetingPassword: string;
  isPaid: boolean;
};

export type ClosestConsultation = Omit<Consultation, 'date'> & {
  date: Date;
};
