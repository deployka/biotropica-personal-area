import { differenceInCalendarDays, endOfMonth, endOfWeek, formatISO, startOfWeek } from 'date-fns';
import type{ SomeTask } from '../../@types/entities/Task';

export function add(a: number, b: number) {
  return a + b;
}

export function convertDateToCalendarDayType(date: string, currentDate: Date, tasks: SomeTask[]) {
  const dt = new Date(date);
  const isPast = dt < currentDate;

  const nameOfDay = dt.toLocaleString('ru', { weekday: 'short' });

  return {
    isPast,
    isGrey: false,
    isCurrentDay: currentDate === dt,
    day: dt.getDate(),
    nameOfDay,
    tasks: tasks.filter(task => task.date === date),
  };
}

export function getCalendarPageDays(month: string | Date) {
  const firsDayInMonth = new Date(month);

  const lastDayInMonth = endOfMonth(firsDayInMonth);

  const startCalendarDay = startOfWeek(firsDayInMonth, { weekStartsOn: 1 });
  const endCalendarDay = endOfWeek(lastDayInMonth, { weekStartsOn: 1 });

  const daysInCalendar = differenceInCalendarDays(endCalendarDay, startCalendarDay);

  const calendarDay = startCalendarDay;

  const calendarPage = [];

  for (let i = 0; i <= daysInCalendar; i++) {
    calendarPage.push(formatISO(calendarDay, { representation: 'date' }));
    calendarDay.setDate(startCalendarDay.getDate() + 1);
  }

  return calendarPage;
}
