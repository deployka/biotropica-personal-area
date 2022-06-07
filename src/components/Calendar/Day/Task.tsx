import React from 'react';
import classNames from 'classnames';
import { Task } from '../../../@types/entities/Task';

import s from './Task.module.scss';

interface Props {
  task: Task;
  onClickTask(taskId: string): void;
}

export const CalendarTask = ({ task, onClickTask }: Props) => {
  const startTime = task.startTime?.slice(0, 5);
  const endTime = task.endTime?.slice(0, 5);

  return (
    <div
      className={classNames(s.task, task.status !== 'init' ? s.old : '')}
      onClick={() => {
        onClickTask(task.id);
      }}
    >
      <div className={s.type}>
        <div className={classNames(s.dot, s[task.type])}></div>
      </div>
      <div className={s.info}>
        {task.startTime ? (
          <div className={s.time}>
            <p>
              {startTime} {task.endTime ? `– ${endTime}` : ''}
            </p>
          </div>
        ) : (
          ''
        )}
        <div className={classNames(s.title, s[task.status])}>{task.title}</div>
      </div>
    </div>
  );
};
