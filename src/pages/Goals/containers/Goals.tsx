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
import {
  getProgressValueByTypeAndUnit,
  showNotificationAfterDeleteGoal,
  showNotificationAfterGoalComplete,
  showNotificationAfterUpdateGoal,
} from '../../../utils/goalsHelper';
import { MAX_PROGRESS } from '../../../constants/goals';

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

  const [changedGoal, setChangedGoal] = useState<Goal | undefined>(undefined);
  const [goalState, setGoalState] = useState<GoalState | null>(null);

  const [progressValue, setProgressValue] = useState(0);

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
    if (changedGoal && goalState && loadingGoal) {
      switch (goalState) {
        case GoalState.COMPLETED:
          dispatch(setGoalsData(goals.filter(g => g.id !== changedGoal.id)));
          showNotificationAfterGoalComplete(changedGoal.name);
          setChangedGoal(() => undefined);
          break;
        case GoalState.UPDATED:
          showNotificationAfterUpdateGoal(changedGoal.name);
          break;
        case GoalState.DELETED:
          dispatch(setGoalsData(goals.filter(g => g.id !== changedGoal.id)));
          showNotificationAfterDeleteGoal(changedGoal.name);
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

    if (progressValue >= MAX_PROGRESS) {
      onChangeGoal(GoalState.COMPLETED, goal);
      dispatch(updateGoalData({ id: goal?.id, completed: true }));
    }
  }, [goal, onChangeGoal, getProgressValueByTypeAndUnit, loadingGoal]);

  useEffect(() => {
    eventBus.emit(EventTypes.removeNotification, 'delete-notification');
    if (goal) {
      const value = getProgressValueByTypeAndUnit(goal.type, goal.units, goal);
      const progressValue = value <= MAX_PROGRESS ? value : MAX_PROGRESS;
      setProgressValue(progressValue);
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
        progressBarOptions={{
          width: 120,
          height: 120,
          circleWidth: 8,
          gradientStartColor: '#6F61D0',
          gradientStopColor: '#C77EDF',
          bgColor: '#F7F6FB',
          progressValue,
        }}
        goal={goal}
        onChangeGoal={onChangeGoal}
      />
    </div>
  );
};
export default Goals;
