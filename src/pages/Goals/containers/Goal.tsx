import React, { useRef, useState } from 'react';
import { FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { eventBus, EventTypes } from '../../../services/EventBus';
import {
  deleteGoalData,
  updateGoalData,
} from '../../../store/ducks/goal/actionCreators';
import { selectGoalLoadingStatus } from '../../../store/ducks/goal/selectors';
import { LoadingStatus } from '../../../store/types';
import { Graph } from '../components/Graph/Graph';
import { NotificationButtons } from '../components/ProgressForm/NotificationButtons';
import { ProgressForm } from '../components/ProgressForm/ProgressForm';
import { Dates, GoalState } from './Goals';
import s from './Goals.module.scss';
import { GraphHeader } from './GraphHeader';
import { UpdateGoalValues } from '../../../store/ducks/goal/contracts/state';
import { progressBarOptions } from '../components/ProgressBar/ProgressBar';

type Props = {
  goal: Goal | undefined;
  progressBarOptions: progressBarOptions;
  onChangeGoal: (goalState: GoalState, goal: Goal) => void;
};

export const Goal = ({ goal, onChangeGoal, progressBarOptions }: Props) => {
  const dispatch = useDispatch();

  const refResetForm = useRef<(() => void) | null>(null);

  const loading = useSelector(selectGoalLoadingStatus);

  const [visibleDeleteNot, setVisibleDeleteNot] = useState<boolean>(false);

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
      setVisibleDeleteNot(false);
    };
  }

  function onDiscard() {
    setVisibleDeleteNot(false);
  }

  function showDeleteGoalConfirmation() {
    if (visibleDeleteNot || !goal) return;
    setVisibleDeleteNot(true);
    eventBus.emit(EventTypes.notification, {
      title: `Удалить цель «${goal.name}»?`,
      message: (
        <NotificationButtons onDiscard={onDiscard} onDelete={onDelete(goal)} />
      ),
      type: NotificationType.DANGER,
      dismiss: undefined,
      id: 'delete-notification',
      onRemoval: () => {
        setVisibleDeleteNot(false);
      },
    });
  }

  async function onSubmitUpdateGoal(
    { value, createdAt }: UpdateGoalValues,
    options: FormikHelpers<UpdateGoalValues>,
  ) {
    if (goal) {
      onChangeGoal(GoalState.UPDATED, goal);
    }
    refResetForm.current = options.resetForm;

    dispatch(
      updateGoalData({
        id: goal?.id,
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
