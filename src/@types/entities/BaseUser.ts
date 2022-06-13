import { BaseEntity } from './BaseEntity';
import { ROLE, Role } from './Role';
import { Specialist } from './Specialist';
import { TARIFF } from './Tariff';

export type BaseUser = BaseEntity & {
  email: Email;
  dob?: DateTimeString;
  gender: { value: string; label: string }[];
  password: string;
  profilePhoto: string | null;
  name: string;
  lastname: string;
  patronymic: string | null;
  phone: string;
  confirmed: boolean;
  isOnline: boolean | null;
  roles: Role[];
  tariff: TARIFF;
  accesses: [];
  confirmedHash: string | null;
  restoreToken: string | null;
  specialist: Specialist | null;
};
