import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import s from './Notification.module.scss';

interface Props {
  notification: INotification;
}

export const Notification = ({ notification }: Props) => {
  const { message, link, createdAt } = notification;
  return (
    <div className={s.notification}>
      <div className={s.info}>
        <div className={s.text}>
          <p>{message}</p>
        </div>
        <div className={s.date}>
          <p>{moment(new Date(createdAt), 'YYYYMMDD').fromNow()}</p>
        </div>
      </div>
      <div className={s.actions}>
        <Link to={link} className={s.link}>
          перейти
        </Link>
        <div className={s.delete}>
          <p>удалить</p>
        </div>
      </div>
    </div>
  );
};
