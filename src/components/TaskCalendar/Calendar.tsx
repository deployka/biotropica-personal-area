import React, { useEffect, useState } from 'react';
import { CalendarDay, CalendarDayType } from '../CalendarDay/CalendarDay';
import { formatISO } from 'date-fns';

import s from './TaskCalendar.module.scss';
import { getCalendarPageDays } from './TaskCalendarHelper';
import { Task } from '../../store/@types/Task';

interface Props {
  tasks: Task[];
  currentMonth: string;
  onClickTask(taskId: string): void;
}

export const Calendar = ({ tasks, currentMonth, onClickTask }: Props) => {
  const [daysWithTasks, setDaysWithTasks] = useState<CalendarDayType[]>([]);

  useEffect(() => {
    const period = getCalendarPageDays(currentMonth);
    const currentDate = formatISO(new Date()).slice(0, 10);

    setDaysWithTasks(period.map(date => {
      const day = date.slice(8, 10);
      return {
        isCurrentDay: currentDate === date,
        day: +day,
        tasks: tasks.filter(task => task.date === date),
      };
    }));
  }, [tasks, currentMonth]);

  return (
    <div className={s.calendarBody}>
      {daysWithTasks.map((date: CalendarDayType, i: number) => (
        <div key={`${date.day}_${i}`} className={s.cell}>
          <CalendarDay
            calendarDay={date}
            onClickTask={onClickTask}
          />
        </div>
      ))}
    </div>
  );
};
