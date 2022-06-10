import { BaseEntity } from './BaseEntity';
import { Client } from './Client';

export type UserEvent = BaseEntity & {
  text: string;
  description: string;
  user: Client;
};
