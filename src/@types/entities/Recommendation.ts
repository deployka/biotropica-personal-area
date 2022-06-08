import { BaseEntity } from './BaseEntity';
import { BaseUser } from './BaseUser';
import { Client } from './Client';
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
  specialist: BaseUser;
  status: RecommendationStatus;
  title: string;
  user: Client;
  specialization: Specialization;
};
