import { BaseUser } from './BaseUser';
import { TARIFF } from './Tariff';

export type Client = BaseUser & {
  dob?: DateTimeString;
  gender: { value: string; label: string }[];
  isOnline: boolean | null;
  banned: boolean;
  banReason: string | null;
  tariff: TARIFF;
  questionHash: string | null;
};
