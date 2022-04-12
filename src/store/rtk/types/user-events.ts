import { User } from '../types/user';

export interface UserEvent {
  id: number;
  text: string;
  user: User
  createdAt: string;
  updatedAt: string;
}
