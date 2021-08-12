import classNames from 'classnames';
import React from 'react';

import s from './Calendar.module.scss';
interface Calendar {
  options: any;
}

interface Days {
  [key: string]: Array<number | null>;
}

export const Calendar = ({ options }: Calendar) => {
  const { month, year } = options;
  const days: Days = {
    Пн: [null, 7, 14, 21, 28],
    Вт: [1, 8, 15, 22, 29],
    Ср: [2, 9, 16, 23, 30],
    Чт: [3, 10, 17, 24, null],
    Пт: [4, 11, 18, 25, null],
    Сб: [5, 12, 19, 26, null],
    Вс: [6, 13, 20, 27, null],
  };
  return (
    <div className={s.calendar}>
      <div className={s.calendar__header}>
        <span className={s.calendar__month}>{month}</span>
        {'  '}
        <span className={s.calendar__year}>{year}</span>
      </div>
      <div className={s.calendar__days__wrapper}>
        <div className={s.calendar__columns}>
          {Object.keys(days).map((day: string, indexTop) => (
            <div className={s.calendar__column}>
              <div className={s.calendar__column__title}>{day}</div>
              <div className={s.calendar__column__days}>
                {days[day].map((dayNum: number | null, index) => (
                  <div
                    className={classNames({
                      [s.calendar__column__day]: true,
                      [s.active]: index > 0,
                      [s.endpoint]: index === days[day].length - indexTop + 3,
                      [s.startpoint]: index === days[day].length - indexTop - 4,
                      [s.disabled]: dayNum === null,
                    })}
                  >
                    <div className={s.calendar__column__day__num}>{dayNum}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
