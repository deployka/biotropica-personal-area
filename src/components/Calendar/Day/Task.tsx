import React from 'react';
import cn from 'classnames';
import { SomeTask, TaskStatus } from '../../../@types/entities/Task';

import s from './Task.module.scss';
import { getTaskDecor, getTaskStatus } from './dayHelper';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../../store/storeHooks';
import {
  selectCurrentUser,
  selectIsDoctor,
} from '../../../store/slices/authSlice';

interface Props {
  task: SomeTask;
  isPast: boolean;
  onClickTask(taskId: string, status?: TaskStatus): void;
  doneButtonHandler(): void;
}

export const CalendarTask = ({ task, onClickTask, isPast, doneButtonHandler }: Props) => {
  const startTime = task.startTime?.slice(0, 5);
  const endTime = task.endTime?.slice(0, 5);

  const currentUser = useAppSelector(selectCurrentUser);
  const isDoctor = useAppSelector(selectIsDoctor);

  const isMobile = useMediaQuery('(max-width: 767px)');

  const status = getTaskStatus(task, isPast);
  const { color, icon } = getTaskDecor(task);

  const isPrivate =
    task.isPrivate && currentUser?.id !== task.authorId && isDoctor;

  const backgroundColor = !isMobile ? undefined : isPrivate ? '#8f8f8f' : color;

  const buttonClickHandlerMobile = () => {
    task.status !== 'completed' && doneButtonHandler();
  };

  const buttonClickHandlerDesktop = () => {
    onClickTask(task.id);
    if (task.status !== 'completed') {
      doneButtonHandler();
    }
  };

  return (
    <>
        <div
      className={cn(s.task, { [s.old]: isPast, [s.private]: isPrivate })}
      onClick={() => {
        onClickTask(task.id);
      }}
      style={{ backgroundColor }}
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
              backgroundColor: task.isPrivate ? backgroundColor : color,
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
        <div className={cn([s.title, { [s[status]]: isPast }, task.status === 'completed' && s.taskIsDoneText])}>{task.title}</div>
      </div>
      {isMobile &&
        (<button
          onClick={buttonClickHandlerMobile}
          className={[s.button, task.status === 'completed' && s.taskIsDone].join(' ')}
          disabled={isPast}
        >Выполнено</button>
        )
      }
    </div>
    { !isMobile &&
      (<button
        onClick={buttonClickHandlerDesktop}
        className={[s.button, task.status === 'completed' && s.taskIsDone].join(' ')}
        disabled={isPast}
      >Выполнено</button>)
    }
    </>
  );
};
