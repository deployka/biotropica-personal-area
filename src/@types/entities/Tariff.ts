import { BaseEntity } from './BaseEntity';

export enum TARIFF {
  BASE = 'BASE',
  EXTENDED = 'EXTENDED',
  INDIVIDUAL = 'INDIVIDUAL',
}

export type Accesses =
  | 'CONSULTATION'
  | 'PROGRESS'
  | 'ANALYZES'
  | 'ALL_CHAT'
  | 'TRAINER_CHAT';

export type ChatAccesses = 'ALL_CHAT' | 'TRAINER_CHAT';

type TariffAccess = BaseEntity & {
  key: Accesses | ChatAccesses;
  value: number;
  tariffId: number;
  tariff: Tariff;
};

type RemindedAccess = TariffAccess & {
  reminded: number;
};

export type TariffOrder = {
  tariffId: number;
  order: number;
};

export type Tariff = BaseEntity & {
  cost: number;
  order: number;
  zakazSystemId: string;
  title: string;
  description: string;
  access: TariffAccess[];
  includedFields: Array<string>;
};

export type NewTariff = Omit<Tariff, 'id'>;

export type CurrentTariff = {
  uuid: string;
  createdAt: DateTimeString;
  updatedAt: DateTimeString;
  userUuid: string;
  isPaid: boolean;
  tariff: Tariff;
  tariffId: number;
  expiredAt: DateTimeString;
  remindedAccess: RemindedAccess[];
};
