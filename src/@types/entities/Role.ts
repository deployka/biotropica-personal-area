import { BaseEntity } from './BaseEntity';

export enum ROLE {
  CLIENT = 'CLIENT',
  SPECIALIST = 'SPECIALIST',
  ADMIN = 'ADMIN',
}

export type Role = BaseEntity & {
  name: ROLE;
};
