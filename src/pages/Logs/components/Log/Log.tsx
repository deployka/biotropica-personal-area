import React from 'react';

import s from './Log.module.scss';
import { format } from 'date-fns';
import { UserEvent } from '../../../../store/rtk/requests/user-events';

interface Props {
    log: UserEvent;
}

export const Log = ({ log }: Props) => {
  const datetime = new Date(log.createdAt);
  const date = format(datetime, 'dd.MM.yyyy');
  const time = format(datetime, 'HH:mm');
  const userName = log.user?.name + ' ' + log.user?.lastname;

  return (
    <tr className={s.log}>
      <td className={s.info}>
        <div className={s.date}>
          <p>{date} {time}</p>
        </div>
      </td>
      <td className={s.user}>
        <p>{userName}</p>
      </td>
      <td className={s.action}>
        <p>{log.description}</p>
      </td>
    </tr>
  );
};
