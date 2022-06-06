import { BaseEntity } from './BaseEntity';
import { ROLE } from './Role';

export type BaseUser = BaseEntity & {
  email: Email;
  password: string;
  profilePhoto: string | null;
  name: string;
  lastname: string;
  patronymic: string | null;
  phone: string;
  confirmed: boolean;
  roles: ROLE[];
  accesses: [];
  confirmedHash: string | null;
  restoreToken: string | null;
};
