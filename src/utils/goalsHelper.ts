import { NotificationType } from '../components/GlobalNotifications/GlobalNotifications';
import { eventBus, EventTypes } from '../services/EventBus';
import { ISelect } from '../shared/Form/Select/SelectCustom';
import { GoalType, RunUnits } from '../store/ducks/goal/contracts/state';
import { Goal, GoalUnits } from '../@types/entities/Goal';

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
      goal.values
        .slice()
        .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))) ||
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

export function showNotificationAfterDeleteGoal(name: string) {
  eventBus.emit(EventTypes.notification, {
    title: `Цель «${name}» успешно удалена!`,
    message: 'Чтобы закрыть это уведомление, нажмите на него',
    type: NotificationType.SUCCESS,
    dismiss: {
      duration: 5000,
      pauseOnHover: true,
      onScreen: true,
    },
  });
}

export function showNotificationAfterUpdateGoal(name: string) {
  eventBus.emit(EventTypes.notification, {
    title: `Цель «${name}» успешно обновлена!`,
    message: 'Не забывайте регулярно отмечать свой прогресс в достижении цели',
    type: NotificationType.INFO,
    dismiss: {
      duration: 5000,
      pauseOnHover: true,
      onScreen: true,
    },
  });
}

export function showNotificationAfterGoalComplete(name: string) {
  eventBus.emit(EventTypes.notification, {
    title: `Цель «${name}» успешно завершена!`,
    message: 'Поздравляем с завершением цели!',
    type: NotificationType.SUCCESS,
    dismiss: {
      duration: 15000,
      pauseOnHover: true,
      onScreen: true,
    },
  });
}
