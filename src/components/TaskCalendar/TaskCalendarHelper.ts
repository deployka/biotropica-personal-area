import { differenceInCalendarDays, endOfMonth, endOfWeek, formatISO, startOfWeek } from 'date-fns';

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
