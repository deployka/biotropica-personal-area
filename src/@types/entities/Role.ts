import { BaseEntity } from './BaseEntity';

export enum ROLE {
  CLIENT = 'CLIENT',
  TRAINER = 'TRAINER',
  ADMIN = 'ADMIN',
}

export type Role = BaseEntity & {
  name: ROLE;
};
