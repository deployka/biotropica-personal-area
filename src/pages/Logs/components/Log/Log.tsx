import React from 'react';

import s from './Log.module.scss';
import { format } from 'date-fns';
import { UserEvent } from '../../../../@types/entities/UserEvent';
interface Props {
  log: UserEvent;
  onClickUser?: () => void;
}

export const Log = ({ log, onClickUser }: Props) => {
  const datetime = new Date(log.createdAt);
  const date = format(datetime, 'dd.MM.yyyy');
  const time = format(datetime, 'HH:mm');
  const userName = log.user?.name + ' ' + log.user?.lastname;

  return (
    <div className={s.log}>
      <div className={s.info}>
        <div className={s.date}>
          {date} {time}
        </div>
      </div>
      <div className={s.user} onClick={onClickUser}>
        <p>{userName}</p>
      </div>
      <div className={s.action}>
        <p>{log.description}</p>
      </div>
    </div>
  );
};
