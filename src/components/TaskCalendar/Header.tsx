import React from 'react';

import s from './Header.module.scss';

import addIcon from './../../assets/icons/Add.svg';
import arrowIcon from './../../assets/icons/calendar/arrow.svg';
import { TaskCalendarProps } from './TaskCalendar';
import { formatISO, subMonths } from 'date-fns';

interface Props {
  currentMonth: string;
  onAddTask(): void;
  onChangeCurrentMonth(currentMonth: TaskCalendarProps['currentMonth']): void;
}

export const Header = ({
  currentMonth,
  onAddTask,
  onChangeCurrentMonth,
}: Props) => {
  const currentMonthDate = new Date(currentMonth);

  const month = currentMonthDate.toLocaleString('ru-Ru', { month: 'long' });
  const year = currentMonthDate.getFullYear();

  function getStringDateFromDate(date: Date) {
    return formatISO(date).slice(0, 7);
  }

  function onClickPrevMonth() {
    const prevMonth = subMonths(currentMonthDate, 1);
    onChangeCurrentMonth(getStringDateFromDate(prevMonth));
  }

  function onClickNextMonth() {
    const nextMonth = subMonths(currentMonthDate, -1);
    onChangeCurrentMonth(getStringDateFromDate(nextMonth));
  }

  return (
    <div className={s.header}>
      <div className={s.left}>
        <img
          className={s.leftArrow}
          src={arrowIcon}
          alt=""
          onClick={onClickPrevMonth}
        />
        {month} <span className={s.year}>{year}</span>
        <img
          className={s.rightArrow}
          src={arrowIcon}
          alt=""
          onClick={onClickNextMonth}
        />
      </div>
      <div className={s.right}>
        <button className={s.addTaskButton} onClick={onAddTask}>
          <img className={s.buttonIcon} src={addIcon} alt="" />{' '}
          <span className={s.desktopText}>Добавить задачу</span>
        </button>
      </div>
    </div>
  );
};
