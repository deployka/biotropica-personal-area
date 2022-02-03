import { ISelect } from '../shared/Form/Select/SelectCustom';
import { GoalType, RunUnits } from '../store/ducks/goal/contracts/state';

export function getMaxValueFromGoalValues(goal: Goal): number {
  const values = goal.values?.map(value => value.value) || [];
  values.push(goal.startResult);
  return Math.max(...values);
}

export function getProgressValueByTypeAndUnit(
  type: GoalType,
  units: ISelect<Partial<GoalUnits> | null>[],
  goal: Goal,
): number {
  const sortedValues =
    (goal.values &&
      [...goal.values].sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
      )) ||
    [];
  const weight = sortedValues[0]?.value || goal?.startResult;
  switch (type) {
    case GoalType.RUN:
      switch (units[0].value) {
        case RunUnits.KILOMETER:
        case RunUnits.MINUTES:
        case RunUnits.MINUTES_KILOMETER:
          return Math.floor(
            (getMaxValueFromGoalValues(goal) * 100) / +goal.endResult,
          );
      }
      break;
    case GoalType.WEIGHT:
      if (goal.startResult > goal.endResult) {
        return +(+goal.endResult / weight).toFixed(2) * 100;
      }
      return Math.floor((weight / goal.endResult) * 100);
    case GoalType.FORCE:
      return Math.floor(
        (getMaxValueFromGoalValues(goal) * 100) / goal.endResult,
      );
    default:
      break;
  }
  return 0;
}
