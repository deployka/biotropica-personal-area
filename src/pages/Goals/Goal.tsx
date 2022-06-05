import React, { useRef, useState } from 'react';
import { FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { eventBus, EventTypes } from '../../services/EventBus';
import {
  deleteGoalData,
  updateGoalData,
} from '../../store/ducks/goal/actionCreators';
import { selectGoalLoadingStatus } from '../../store/ducks/goal/selectors';
import { LoadingStatus } from '../../store/types';

import { Dates, GoalState } from './Goals';
import s from './Goals.module.scss';
import { GraphHeader } from '../../components/Goals/GraphHeader/GraphHeader';
import { UpdateGoalValues } from '../../store/ducks/goal/contracts/state';

import { ProgressForm } from '../../components/Goals/ProgressForm/ProgressForm';
import { progressBarOptions } from '../../components/Goals/ProgressBar/ProgressBar';
import { NotificationButtons } from '../../components/Goals/ProgressForm/NotificationButtons';
import { Graph } from '../../components/Goals/Graph/Graph';

type Props = {
  goal: Goal | undefined;
  progressBarOptions: progressBarOptions;
  onChangeGoal: (goalState: GoalState, goal: Goal) => void;
};

export const Goal = ({ goal, onChangeGoal, progressBarOptions }: Props) => {
  const dispatch = useDispatch();

  const refResetForm = useRef<(() => void) | null>(null);

  const loading = useSelector(selectGoalLoadingStatus);

  const [visibleDeleteNotification, setVisibleDeleteNotification] =
    useState<boolean>(false);

  const [dates, setDates] = useState<Dates>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [graphDates, setGraphDates] = useState<Dates>({
    startDate: new Date(),
    endDate: new Date(),
  });

  function onDelete(goal: Goal) {
    return () => {
      onChangeGoal(GoalState.DELETED, goal);
      dispatch(deleteGoalData(goal.id));
      setVisibleDeleteNotification(false);
    };
  }

  function onDiscard() {
    setVisibleDeleteNotification(false);
  }

  function showDeleteGoalConfirmation() {
    if (visibleDeleteNotification || !goal) return;
    setVisibleDeleteNotification(true);
    eventBus.emit(EventTypes.notification, {
      title: `Удалить цель «${goal.name}»?`,
      message: (
        <NotificationButtons onDiscard={onDiscard} onDelete={onDelete(goal)} />
      ),
      type: NotificationType.DANGER,
      dismiss: undefined,
      id: 'delete-notification',
      onRemoval: () => {
        setVisibleDeleteNotification(false);
      },
    });
  }

  async function onSubmitUpdateGoal(
    { value, createdAt }: UpdateGoalValues,
    options: FormikHelpers<UpdateGoalValues>,
  ) {
    if (!goal) return;
    onChangeGoal(GoalState.UPDATED, goal);
    refResetForm.current = options.resetForm;

    dispatch(
      updateGoalData({
        id: goal.id,
        values: [
          {
            value: +value,
            createdAt,
          },
        ],
      }),
    );
  }

  return (
    <div className={s.content}>
      <div className={s.graph}>
        <GraphHeader
          setDates={setDates}
          setGraphDates={setGraphDates}
          dates={dates}
        />
        <Graph startDate={graphDates.startDate} endDate={graphDates.endDate} />
      </div>
      <div className={s.edit}>
        {goal && (
          <ProgressForm
            progressBarOptions={progressBarOptions}
            onDeleteGoal={showDeleteGoalConfirmation}
            onSubmit={onSubmitUpdateGoal}
            isLoading={loading === LoadingStatus.LOADING}
            goal={goal}
          />
        )}
      </div>
    </div>
  );
};
