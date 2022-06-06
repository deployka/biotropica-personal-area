import { GoalType, GoalUnits } from '../../entities/Goal';

export type CreateGoalDto = Readonly<{
  name: string;
  type: GoalType;
  units: GoalUnits[];
  description: string;
  startResult: number;
  endResult: number;
}>;
