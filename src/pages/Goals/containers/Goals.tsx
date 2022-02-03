import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  fetchGoalData,
  updateGoalData,
} from '../../../store/ducks/goal/actionCreators';
import {
  selectGoalData,
  selectGoalStatus,
} from '../../../store/ducks/goal/selectors';
import {
  selectGoalsData,
  selectGoalsStatus,
} from '../../../store/ducks/goals/selectors';
import { LoadingStatus } from '../../../store/types';
import s from './Goals.module.scss';
import { Header } from './Header';
import { Goal } from './Goal';
import { setGoalsData } from '../../../store/ducks/goals/actionCreators';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { getProgressValueByTypeAndUnit } from '../../../utils/goalsHelper';

export interface Dates {
  startDate: Date;
  endDate: Date;
}

export enum GoalState {
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
  COMPLETED = 'COMPLETED',
}

interface Params {
  id: string;
}

const Goals = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const goals: Goal[] = useSelector(selectGoalsData) || [];
  const goal = useSelector(selectGoalData);

  const loadingGoals = useSelector(selectGoalsStatus);
  const loadingGoal = useSelector(selectGoalStatus);

  const [changedGoal, setChangedGoal] = useState<Goal>();
  const [goalState, setGoalState] = useState<GoalState | null>(null);

  const [progressBarOptions, setProgressBarOptions] = useState({
    width: 120,
    height: 120,
    circleWidth: 8,
    gradientStartColor: '#6F61D0',
    gradientStopColor: '#C77EDF',
    bgColor: '#F7F6FB',
    progressValue: 0,
  });

  const { id } = useParams<Params>();
  const paramGoalId = +id;

  function getGoalById(id: number) {
    if (id !== paramGoalId) {
      dispatch(fetchGoalData(id));
    }
  }

  useEffect(() => {
    if (loadingGoal === LoadingStatus.NEVER && paramGoalId) {
      dispatch(fetchGoalData(paramGoalId));
    }
  }, []);

  useEffect(() => {
    if (goal?.id) {
      history.push(`/goals/${goal.id}`);
    }
  }, [goal?.id]);

  useEffect(() => {
    if (loadingGoals === LoadingStatus.LOADING) return;
    if (loadingGoals === LoadingStatus.NEVER) return;
    if (loadingGoal === LoadingStatus.LOADING) return;
    if (loadingGoal === LoadingStatus.SUCCESS) return;

    if (goals.length && (!goal || !paramGoalId)) {
      history.push(`/goals/${goals[0]?.id}`);
      dispatch(fetchGoalData(goals[0]?.id));
    } else if (!goals.length) {
      history.push('/goals/add');
    }
  }, [goals, goal, loadingGoals, loadingGoal, paramGoalId]);

  useEffect(() => {
    function showNotificationAfterDeleteGoal() {
      eventBus.emit(EventTypes.notification, {
        title: `Цель «${changedGoal?.name}» успешно удалена!`,
        message: 'Чтобы закрыть это уведомление, нажмите на него',
        type: NotificationType.SUCCESS,
        dismiss: {
          duration: 5000,
          pauseOnHover: true,
          onScreen: true,
        },
      });
    }

    function showNotificationAfterUpdateGoal() {
      eventBus.emit(EventTypes.notification, {
        title: `Цель «${changedGoal?.name}» успешно обновлена!`,
        message:
          'Не забывайте регулярно отмечать свой прогресс в достижении цели',
        type: NotificationType.INFO,
        dismiss: {
          duration: 5000,
          pauseOnHover: true,
          onScreen: true,
        },
      });
    }

    function showNotificationAfterGoalComplete() {
      eventBus.emit(EventTypes.notification, {
        title: `Цель «${changedGoal?.name}» успешно завершена!`,
        message: 'Поздравляем с завершением цели!',
        type: NotificationType.SUCCESS,
        dismiss: {
          duration: 15000,
          pauseOnHover: true,
          onScreen: true,
        },
      });
    }

    if (changedGoal && goalState && loadingGoal) {
      switch (goalState) {
        case GoalState.COMPLETED:
          dispatch(setGoalsData(goals.filter(g => g.id !== changedGoal.id)));
          showNotificationAfterGoalComplete();
          setChangedGoal(() => undefined);
          break;
        case GoalState.UPDATED:
          showNotificationAfterUpdateGoal();
          break;
        case GoalState.DELETED:
          dispatch(setGoalsData(goals.filter(g => g.id !== changedGoal.id)));
          showNotificationAfterDeleteGoal();
          setChangedGoal(() => undefined);
          break;
        default:
          break;
      }
      setGoalState(() => null);
    }
  }, [goalState, changedGoal]);

  function onChangeGoal(goalState: GoalState, goal: Goal) {
    setGoalState(() => goalState);
    setChangedGoal(goal);
  }

  useEffect(() => {
    if (loadingGoal !== LoadingStatus.LOADED || goal?.completed) return;
    if (goalState === GoalState.COMPLETED || !goal) return;

    const progressValue = getProgressValueByTypeAndUnit(
      goal.type,
      goal.units,
      goal,
    );

    if (progressValue >= 100) {
      onChangeGoal(GoalState.COMPLETED, goal);
      dispatch(updateGoalData({ id: goal?.id, completed: true }));
    }
  }, [goal, onChangeGoal, getProgressValueByTypeAndUnit, loadingGoal]);

  useEffect(() => {
    eventBus.emit(EventTypes.removeNotification, 'delete-notification');
    if (goal) {
      const value = getProgressValueByTypeAndUnit(goal.type, goal.units, goal);
      const progressValue = value <= 100 ? value : 100;
      setProgressBarOptions({
        ...progressBarOptions,
        progressValue,
      });
    }
  }, [goal, getProgressValueByTypeAndUnit]);

  return (
    <div className={s.goals}>
      <Header
        onGoalClick={getGoalById}
        goals={goals}
        active={paramGoalId || goals[goals.length - 1]?.id}
      />
      <Goal
        progressBarOptions={progressBarOptions}
        goal={goal}
        onChangeGoal={onChangeGoal}
      />
    </div>
  );
};
export default Goals;
