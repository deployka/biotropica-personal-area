import { BaseEntity } from './BaseEntity';

export enum TARIFF {
  BASE = 'BASE',
  EXTENDED = 'EXTENDED',
  INDIVIDUAL = 'INDIVIDUAL',
}

export type Tariff = BaseEntity & {
  cost: number;
  title: string;
  description: string;
  includedFields: Array<string>;
};

export type NewTariff = Omit<Tariff, 'id'>;
