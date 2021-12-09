import { ISelect } from '../../../../shared/Form/Select/SelectCustom';
import { LoadingStatus } from '../../../types';

export interface Goal {
  id: number;
  name: string;
  type: GoalType;
  units: ISelect<Partial<GoalUnits> | null>[];
  description: string;
  values: GoalValue[];
  start_result: string;
  userId: number;
  end_result: string;
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

type Response = {
  message: string;
  statusCode: number;
};

export enum GoalType {
  FORCE = 'FORCE',
  WEIGHT = 'WEIGHT',
  RUN = 'RUN',
}

export interface UpdateGoalData extends Partial<Goal> {}
export interface CreateGoalData
  extends Omit<Goal, 'id' | 'values' | 'userId' | 'completed' | 'createdAt'> {}
