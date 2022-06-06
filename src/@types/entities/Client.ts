import { BaseUser } from './BaseUser';
import { TARIFF } from './Tariff';

export type Client = BaseUser & {
  dob: DateTimeString | null;
  gender: string | null;
  isOnline: boolean | null;
  banned: boolean;
  banReason: string | null;
  tariff: TARIFF;
  questionHash: string | null;
};
