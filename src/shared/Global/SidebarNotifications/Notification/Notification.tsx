import classNames from 'classnames';
import React from 'react';
import s from './Notification.module.scss';

interface Props {
  options: any;
}

export const Notification = ({ options }: Props) => {
  return (
    <div className={s.notification}>
      <div className={s.notification__info}>
        <div className={s.notification__text}>
          {options.text}
          {'   '}
          <span className={s.date__day}>{options.day}</span>
          {'   '}
          <span className={s.date__month}>{options.month}</span>
        </div>
        <div className={s.date__belate}>
          {options.belate} {options.units} назад
        </div>
      </div>
      <div className={s.notification__actions}>
        <a href={options.taskLink} className={s.notification__link}>
          перейти к заданию
        </a>
        <div className={s.notification__delete}>удалить</div>
      </div>
    </div>
  );
};
