import { GoalValue } from '../../entities/Goal';

export type UpdateGoalDto = Readonly<
  { id: string } & Partial<{
    name: string;
    description: string;
    values: GoalValue[];
    startResult: number;
    endResult: number;
    completed: boolean;
  }>
>;
