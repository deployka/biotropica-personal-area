import { BaseEntity } from './BaseEntity';
import { Client } from './Client';
import { Specialist } from './Specialist';

export type Consultation = BaseEntity & {
  date: string;
  specialist: Specialist;
  user: Client;
  meetingNumber: number;
  meetingPassword: string;
};
