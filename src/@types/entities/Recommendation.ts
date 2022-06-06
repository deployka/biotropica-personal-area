import { BaseEntity } from './BaseEntity';
import { Client } from './Client';
import { Specialist } from './Specialist';
import { Specialization } from './Specialization';

export enum RecommendationStatus {
  INITIATED = 'INITIATED',
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export type Recommendation = BaseEntity & {
  description: string;
  specialist: Specialist;
  status: RecommendationStatus;
  title: string;
  user: Client;
  specialization: Specialization;
};
