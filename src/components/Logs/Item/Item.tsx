import React from 'react';
import { format } from 'date-fns';

import { UserEvent } from '../../../@types/entities/UserEvent';

import s from './Item.module.scss';
import { getFullName } from '../../../utils/getFullName';

type Props = {
  log: UserEvent;
  onClickUser?: () => void;
};

export const LogItem = ({ log, onClickUser }: Props) => {
  const datetime = new Date(log.createdAt);
  const date = format(datetime, 'dd.MM.yyyy');
  const time = format(datetime, 'HH:mm');
  const userName = getFullName(log.user.name, log.user.lastname);

  return (
    <div className={s.log}>
      <div className={s.date}>
        {date} {time}
      </div>
      <div className={s.user} onClick={onClickUser}>
        {userName}
      </div>
      <div className={s.action}>{log.description}</div>
    </div>
  );
};
