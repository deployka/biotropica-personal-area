import { GoalValue } from '../../entities/Goal';

export type UpdateGoalDto = Readonly<
  { id: UniqueId } & Partial<{
    name: string;
    description: string;
    values: GoalValue[];
    startResult: number;
    endResult: number;
    completed: boolean;
  }>
>;
