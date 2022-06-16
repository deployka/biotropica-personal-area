import React, { useEffect } from 'react';
import classNames from 'classnames';
import { SomeTask } from '../../../@types/entities/Task';

import s from './Task.module.scss';

interface Props {
  task: SomeTask;
  isPast: boolean;
  onClickTask(taskId: string): void;
}

export const CalendarTask = ({ task, onClickTask, isPast }: Props) => {
  const startTime = task.startTime?.slice(0, 5);
  const endTime = task.endTime?.slice(0, 5);

  let status = isPast ? 'completed' : 'inProgress';

  if (task.type === 'training') {
    const factValue = task.firstFactValue || 0;
    if (factValue === 0) {
      status = 'failed';
    }

    if (factValue !== 0 && factValue < task.firstTargetValue) {
      status = 'nearly';
    }
  }

  return (
    <div
      className={classNames(s.task, isPast ? s.old : '')}
      onClick={() => {
        onClickTask(task.id);
      }}
    >
      <div className={s.type}>
        <div className={classNames(s.dot, s[task.type])}></div>
      </div>
      <div className={s.info}>
        {task.startTime && (
          <div className={s.time}>
            <p>
              {startTime} {task.endTime ? `– ${endTime}` : ''}
            </p>
          </div>
        )}
        <div className={classNames(s.title, { [s[status]]: isPast })}>
          {task.title}
        </div>
      </div>
    </div>
  );
};
