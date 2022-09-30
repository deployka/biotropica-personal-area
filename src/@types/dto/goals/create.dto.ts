import { ISelect } from '../../../shared/Form/Select/SelectCustom';
import { GoalType, GoalUnits } from '../../entities/Goal';

export type CreateGoalDto = Readonly<{
  name: string;
  type: GoalType;
  units: ISelect<string | null>[];
  description: string;
  startResult: number;
  endResult: number;
}>;
