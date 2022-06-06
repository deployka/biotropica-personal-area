import { ISelect } from '../../shared/Form/Select/SelectCustom';
import { BaseEntity } from './BaseEntity';

export enum GoalType {
  FORCE = 'FORCE',
  WEIGHT = 'WEIGHT',
  RUN = 'RUN',
}

export enum RunUnits {
  KILOMETER = 'KILOMETER',
  MINUTES = 'MINUTES',
  MINUTES_KILOMETER = 'MINUTES_KILOMETER',
}

export enum WeightUnits {
  KILOGRAM = 'KILOGRAM',
  GRAM = 'GRAM',
  PERCENT = 'PERCENT',
  CENTIMETERS = 'CENTIMETERS',
}

export enum ForceUnits {
  KILOGRAM = 'KILOGRAM',
}

export type GoalUnits = {
  [GoalType.RUN]: RunUnits;
  [GoalType.WEIGHT]: WeightUnits;
  [GoalType.FORCE]: ForceUnits;
};

export type GoalValue = {
  value: number;
  createdAt: DateTimeString;
};

export type Goal = BaseEntity & {
  name: string;
  type: GoalType;
  // FIXME: сделать валидатор для целей
  units: ISelect<Partial<GoalUnits> | null>[];
  description: string;
  values: GoalValue[];
  startResult: number;
  endResult: number;
  userId: UniqueId;
  completed: boolean;
};
