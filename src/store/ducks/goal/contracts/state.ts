import { LoadingStatus } from '../../../types';

export interface Goal {
  id: number;
  name: string;
  type: GoalType;
  description: string;
  values: GoalValue[];
  start_result: string;
  userId: number;
  end_result: string;
  completed: boolean;
  createdAt: string;
}

export interface GoalValue {
  value: string;
  createdAt: Date;
}

export interface GoalState {
  goal: Goal | undefined;
  status: LoadingStatus;
  response: any;
}

export enum GoalType {
  FORCE = 'FORCE',
  WEIGHT = 'WEIGHT',
  RUN = 'RUN',
}

export interface UpdateGoalData extends Partial<Goal> {}
export interface CreateGoalData
  extends Omit<
    Goal,
    'id' | 'description' | 'values' | 'userId' | 'completed' | 'createdAt'
  > {
  description: string;
}
