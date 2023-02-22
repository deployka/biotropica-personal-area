import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { CalendarTask } from './Task';
import { SomeTask, TaskStatus } from '../../../@types/entities/Task';

import s from './Day.module.scss';

import {} from 'date-fns';

export type CalendarDayType = {
  isGrey: boolean;
  isPast: boolean;
  isCurrentDay: boolean;
  day: number; // Число месяца
  nameOfDay: string; // Название дня недели
  tasks: SomeTask[]; // Задачи отображаемого дня
};

export type CalendarDayProps = {
  calendarDay: CalendarDayType;
  onClickTask(taskId: string, status: TaskStatus): void;
  doneButtonHandler(): void;
};

export function CalendarDay({ calendarDay, onClickTask, doneButtonHandler }: CalendarDayProps) {
  const { isCurrentDay, day, nameOfDay, tasks, isPast } = calendarDay;

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref?.current?.scrollIntoView({ block: 'center' });
  }, [ref.current]);

  const sortedTasks = tasks.slice().sort((a: SomeTask, b: SomeTask) => {
    if ((a.startTime ?? '') > (b.startTime ?? '')) return 1;
    return -1;
  });

  return (
    <div
      ref={isCurrentDay ? ref : null}
      className={classNames(s.calendarDay, calendarDay.isGrey ? s.grey : '')}
    >
      <div className={classNames(s.dateAndDay)}>
        <div className={classNames(s.date, isCurrentDay ? s.currentDate : '')}>
          {day}
        </div>
        <div className={classNames(s.date_day, isCurrentDay ? s.currentDate : '')}>
          {nameOfDay}
        </div>
      </div>

      <div className={s.tasksList}>
        {sortedTasks.map(task => (
          <CalendarTask
            key={task.id}
            isPast={isPast}
            task={task}
            onClickTask={onClickTask}
            doneButtonHandler={doneButtonHandler}
          />
        ))}
      </div>
    </div>
  );
}
