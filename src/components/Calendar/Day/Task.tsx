import React from 'react';
import cn from 'classnames';
import { SomeTask } from '../../../@types/entities/Task';

import s from './Task.module.scss';
import { getTaskDecor, getTaskStatus } from './dayHelper';
import useMediaQuery from '../../../hooks/useMediaQuery';

interface Props {
  task: SomeTask;
  isPast: boolean;
  onClickTask(taskId: string): void;
}

export const CalendarTask = ({ task, onClickTask, isPast }: Props) => {
  const startTime = task.startTime?.slice(0, 5);
  const endTime = task.endTime?.slice(0, 5);

  const isMobile = useMediaQuery('(max-width: 767px)');

  const status = getTaskStatus(task, isPast);
  const { color, icon } = getTaskDecor(task);

  return (
    <div
      className={cn(s.task, { [s.old]: isPast })}
      onClick={() => {
        onClickTask(task.id);
      }}
      style={{ backgroundColor: isMobile ? color : undefined }}
    >
      {!isMobile && (
        <div className={s.type}>
          <div className={cn(s.dot, s[task.type])}></div>
        </div>
      )}
      {isMobile && (
        <div className={s.iconWrapper}>
          <div
            className={s.icon}
            style={{
              backgroundColor: color,
              WebkitMaskImage: `url(${icon})`,
              maskImage: `url(${icon})`,
            }}
          />
        </div>
      )}
      <div className={cn(s.info)}>
        {!isMobile && task.startTime && (
          <div className={s.time}>
            <p>
              {startTime} {task.endTime ? `– ${endTime}` : ''}
            </p>
          </div>
        )}
        <div className={cn(s.title, { [s[status]]: isPast })}>{task.title}</div>
      </div>
    </div>
  );
};
