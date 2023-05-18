import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import s from './Notification.module.scss';
import { Notification as INotification } from '../../../../@types/entities/Notification';
import { uniqueId } from 'lodash';
import { id } from 'date-fns/locale';

interface Props {
  notification: INotification;
  onDeleteNotification: (id: number) => void;
}

export const Notification = ({ notification, onDeleteNotification }: Props) => {
  const { message, link, createdAt } = notification;

  const handleClick = () => {
    onDeleteNotification(notification.id);
  };

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
        <div className={s.delete} onClick={handleClick}>
          <p>удалить</p>
        </div>
      </div>
    </div>
  );
};
