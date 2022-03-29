import React from 'react';

import classNames from 'classnames';

import { CalendarTask } from './CalendarTask';

import s from './CalendarDay.module.scss';
import { Task } from '../../store/@types/Task';

export type CalendarDayType = {
  isCurrentDay: boolean;
  day: number; // Число месяца
  tasks: Task[]; // Задачи отображаемого дня
};

export type CalendarDayProps = {
  calendarDay: CalendarDayType;
  onClickTask(taskId: string): void;
};

export function CalendarDay({ calendarDay, onClickTask }: CalendarDayProps) {
  const { isCurrentDay, day, tasks } = calendarDay;

  const sortedTasks = tasks.slice().sort((a: Task, b: Task) => {
    if ((a.startTime ?? '') > (b.startTime ?? '')) return 1;
    return -1;
  });

  return (
    <div className={s.calendarDay}>
      <div
        className={classNames(s.date, isCurrentDay ? s.currentDate : '')}
      >
        {day}
      </div>
      {sortedTasks.map(task => (
        <CalendarTask key={task.id} task={task} onClickTask={onClickTask} />
      ))}
    </div>
  );
}
