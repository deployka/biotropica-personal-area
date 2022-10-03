import { BaseUser } from './BaseUser';
import { Specialist } from './Specialist';
import { TARIFF } from './Tariff';

export type Client = BaseUser & {
  dob?: DateTimeString;
  gender: { value: string; label: string }[];
  banned: boolean;
  banReason: string | null;
  questionHash: string | null;
};
