import React, { useEffect, useState } from 'react';
import { CalendarDay, CalendarDayType } from './Day/Day';
import { formatISO } from 'date-fns';

import s from './TaskCalendar.module.scss';
import { convertDateToCalendarDayType, getCalendarPageDays } from './TaskCalendarHelper';
import { SomeTask } from '../../@types/entities/Task';

interface Props {
  tasks: SomeTask[];
  currentMonth: string;
  onClickTask(taskId: string): void;
  doneButtonHandler?(): void;
}

export const Calendar = ({ tasks, currentMonth, onClickTask }: Props) => {
  const [daysWithTasks, setDaysWithTasks] = useState<CalendarDayType[]>([]);

  useEffect(() => {

    const period = getCalendarPageDays(currentMonth);
    const now = new Date();

    setDaysWithTasks(
      period.map(date => convertDateToCalendarDayType(date, now, tasks)),
    );
  }, [tasks, currentMonth]);

  return (
    <div className={s.calendarBody}>
      {daysWithTasks.map((date: CalendarDayType, i: number) => (
        <div key={`${date.day}_${i}`} className={s.cell}>
          <CalendarDay calendarDay={date} onClickTask={onClickTask} />
        </div>
      ))}
    </div>
  );
};
