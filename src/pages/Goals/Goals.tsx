import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Goal } from './Goal';
import {
  getProgressValueByTypeAndUnit,
  showNotificationAfterDeleteGoal,
  showNotificationAfterGoalComplete,
  showNotificationAfterUpdateGoal,
} from '../../utils/goalsHelper';
import { MAX_PROGRESS } from '../../constants/goals';

import s from './Goals.module.scss';
import { Header } from '../../components/Goals/Header/Header';
import {
  useDeleteGoalMutation,
  useGetGoalQuery,
  useGetGoalsQuery,
  useUpdateGoalMutation,
} from '../../api/goals';
import { UpdateGoalValuesDto } from '../../@types/dto/goals/update-values.dto';
export interface Dates {
  startDate: Date;
  endDate: Date;
}

const Goals = () => {
  const history = useHistory();

  const { id } = useParams<{ id: string }>();
  const paramGoalId = +id;

  const { data: goals = [], isFetching: isLoadingGoals } = useGetGoalsQuery();
  const { data: goal, isFetching: isLoadingGoal } = useGetGoalQuery({
    id: paramGoalId,
  });
  const [updateGoal, { data: goalAfterUpdate }] = useUpdateGoalMutation();
  const [deleteGoal] = useDeleteGoalMutation();

  useEffect(() => {
    if (goal?.id) {
      history.push(`/goals/${goal.id}`);
    }
  }, [goal?.id]);

  async function onDeleteGoal(id: UniqueId, name: string) {
    try {
      await deleteGoal({ id }).unwrap();
      showNotificationAfterDeleteGoal(name);
    } catch (error) {}
  }

  async function onCompleteGoal(id: UniqueId, name: string) {
    try {
      await updateGoal({ id, completed: true }).unwrap();
      showNotificationAfterGoalComplete(name);
    } catch (error) {}
  }

  async function onUpdateGoal(
    { value, createdAt }: UpdateGoalValuesDto,
    id: UniqueId,
    name: string,
  ) {
    const data = {
      id,
      values: [
        {
          value: +value,
          createdAt,
        },
      ],
    };

    try {
      await updateGoal(data).unwrap();
      showNotificationAfterUpdateGoal(name);
    } catch (error) {
      // TODO: show error notification
    }
  }

  useEffect(() => {
    if (!goalAfterUpdate) return;
    const progressValue = getProgressValueByTypeAndUnit(
      goalAfterUpdate.type,
      goalAfterUpdate.units,
      goalAfterUpdate,
    );

    if (progressValue >= MAX_PROGRESS) {
      // TODO: Complete goal confirmation
      onCompleteGoal(goalAfterUpdate.id, goalAfterUpdate.name);
    }
  }, [goalAfterUpdate]);

  return (
    <div className={s.goals}>
      <Header
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
        }}
        goal={goal}
        isLoading={isLoadingGoal}
        onDelete={onDeleteGoal}
        onUpdate={onUpdateGoal}
      />
    </div>
  );
};
export default Goals;
