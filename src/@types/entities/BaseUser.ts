import { BaseEntity } from './BaseEntity';
import { Role } from './Role';

export type BaseUser = BaseEntity & {
  email: Email;
  password: string;
  profilePhoto: string | null;
  name: string;
  lastname: string;
  patronymic: string | null;
  phone: string;
  confirmed: boolean;
  roles: Role[];
  confirmedHash: string | null;
  restoreToken: string | null;
};
