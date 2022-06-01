import React from 'react';

import s from './TaskCalendar.module.scss';
import { Header } from './Header';

import { Calendar } from './Calendar';
import { Task } from '../../store/@types/Task';

export type TaskCalendarProps = {
  tasks: Task[];
  currentMonth: string; // формат YYYY-MM
  onChangeCurrentMonth(currentMonth: TaskCalendarProps['currentMonth']): void;
  onAddTask(): void;
  onClickTask(taskId: string): void;
};

const tableHeader = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

export function TaskCalendar({
  tasks,
  currentMonth,
  onChangeCurrentMonth,
  onAddTask,
  onClickTask,
}: TaskCalendarProps) {
  return (
    <div className={s.tasksCalendar}>
      <Header
        currentMonth={currentMonth}
        onChangeCurrentMonth={onChangeCurrentMonth}
        onAddTask={onAddTask}
      />

      <div className={s.calendar}>
        <div className={s.tableHeader}>
          {tableHeader.map((title, i) => (
            <div className={s.cell} key={i}>
              {title}
            </div>
          ))}
        </div>
        <Calendar
          tasks={tasks}
          currentMonth={currentMonth}
          onClickTask={onClickTask}
        />
      </div>
    </div>
  );
}
