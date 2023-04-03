import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import s from './Notification.module.scss';
import { Notification as INotification } from '../../../../@types/entities/Notification';

interface Props {
  notification: INotification;
  closeNotifications: () => void;
}

export const Notification = ({ notification, closeNotifications=()=>{} }: Props) => {
  const history = useHistory();
  const { message, link, createdAt } = notification;

  const btnListener = () => {
    history.push(link);
    closeNotifications();
  }

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
        <div
          className={s.link_to_btn}
          onClick={btnListener}
        >
          Перейти
        </div>
        <div className={s.delete}>
          <p>Удалить</p>
        </div>
      </div>
    </div>
  );
};
