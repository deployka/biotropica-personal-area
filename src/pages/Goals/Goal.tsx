import React, { useRef, useState } from 'react';
import { FormikHelpers } from 'formik';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { eventBus, EventTypes } from '../../services/EventBus';
import { Dates } from './Goals';
import { GraphHeader } from '../../components/Goals/GraphHeader/GraphHeader';
import { ProgressForm } from '../../components/Goals/ProgressForm/ProgressForm';
import { progressBarOptions } from '../../components/Goals/ProgressBar/ProgressBar';
import { NotificationButtons } from '../../components/Goals/ProgressForm/NotificationButtons';
import { Graph } from '../../components/Goals/Graph/Graph';
import { Goal as IGoal } from '../../@types/entities/Goal';
import { UpdateGoalValuesDto } from '../../@types/dto/goals/update-values.dto';

import s from './Goals.module.scss';

type Props = {
  goal: IGoal | undefined;
  isLoading: boolean;
  onDelete: (id: UniqueId, name: string) => void;
  onUpdate: (values: UpdateGoalValuesDto, id: UniqueId, name: string) => void;
  progressBarOptions: progressBarOptions;
};

export const Goal = ({
  goal,
  progressBarOptions,
  isLoading,
  onDelete,
  onUpdate,
}: Props) => {
  const refResetForm = useRef<(() => void) | null>(null);

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

  function onDeleteGoal(goal: IGoal) {
    return () => {
      onDelete(goal.id, goal.name);
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
        <NotificationButtons
          onDiscard={onDiscard}
          onDelete={onDeleteGoal(goal)}
        />
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
    values: UpdateGoalValuesDto,
    options: FormikHelpers<UpdateGoalValuesDto>,
  ) {
    if (!goal) return;
    refResetForm.current = options.resetForm;
    onUpdate(values, goal.id, goal.name);
  }

  return (
    <div className={s.content}>
      <div className={s.graph}>
        <GraphHeader
          goal={goal}
          setDates={setDates}
          setGraphDates={setGraphDates}
          dates={dates}
        />
        <Graph
          goal={goal}
          startDate={graphDates.startDate}
          endDate={graphDates.endDate}
        />
      </div>
      <div className={s.edit}>
        {goal && (
          <ProgressForm
            progressBarOptions={progressBarOptions}
            onDeleteGoal={showDeleteGoalConfirmation}
            onSubmit={onSubmitUpdateGoal}
            isLoading={isLoading}
            goal={goal}
          />
        )}
      </div>
    </div>
  );
};
