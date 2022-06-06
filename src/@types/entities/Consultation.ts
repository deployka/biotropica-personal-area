import { BaseEntity } from './BaseEntity';
import { Client } from './Client';
import { Specialist } from './Specialist';

export type Consultation = BaseEntity & {
  date: DateTimeString | null;
  specialist: Specialist;
  user: Client;
  meetingNumber: number;
  meetingPassword: string;
};

export type ClosestConsultation = Omit<Consultation, 'date'> & {
  date: Date;
};
