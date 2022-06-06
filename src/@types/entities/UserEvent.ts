import { Client } from './Client';

export interface UserEvent {
  text: string;
  user: Client;
}
