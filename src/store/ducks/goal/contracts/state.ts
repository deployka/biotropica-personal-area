import { LoadingStatus, Response } from '../../../types';
export enum GoalType {
  FORCE = 'FORCE',
  WEIGHT = 'WEIGHT',
  RUN = 'RUN',
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
export interface GoalState {
  goal: Goal | undefined;
  status: LoadingStatus;
  response: Response | undefined;
}

export type UpdateGoalData = Partial<Goal>;
export interface UpdateGoalValues extends Pick<GoalValue, 'createdAt'> {
  value: string;
}

export type CreateGoalData = Pick<
  Goal,
  'name' | 'type' | 'units' | 'description' | 'startResult' | 'endResult'
>;

export interface FormGoalData
  extends Omit<CreateGoalData, 'endResult' | 'startResult'> {
  endResult: string;
  startResult: string;
}
