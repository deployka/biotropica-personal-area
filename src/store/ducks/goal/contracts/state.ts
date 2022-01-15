import { ISelect } from '../../../../shared/Form/Select/SelectCustom';
import { LoadingStatus, Response } from '../../../types';

export enum GoalType {
  FORCE = 'FORCE',
  WEIGHT = 'WEIGHT',
  RUN = 'RUN',
}
export interface Goal {
  id: number;
  name: string;
  type: GoalType;
  units: ISelect<Partial<GoalUnits> | null>[];
  description: string;
  values: GoalValue[];
  startResult: string;
  userId: number;
  endResult: string;
  completed: boolean;
  createdAt: string;
}

export enum GoalSubtype {
  SUM_RESULTS = 'SUM_RESULTS',
  MAX_RESULT = 'MAX_RESULT',
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

export interface GoalValue {
  value: string;
  createdAt: Date;
}

export interface GoalState {
  goal: Goal | undefined;
  status: LoadingStatus;
  response: Response | undefined;
}

export type UpdateGoalData = Partial<Goal>;
export type CreateGoalData = Omit<
  Goal,
  'id' | 'values' | 'userId' | 'completed' | 'createdAt'
>;
