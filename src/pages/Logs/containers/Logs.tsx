import React from 'react';

import s from './Logs.module.scss';

import { Log } from '../components/Log/Log';
import { useRequestUserEventsQuery } from '../../../api/user-events';
import { BaseUser } from '../../../@types/entities/BaseUser';
import { useHistory } from 'react-router';

export const Logs = () => {
  const history = useHistory();
  const { data: events } = useRequestUserEventsQuery();

  const handleClickUser = (user: BaseUser) => {
    if (user.specialist) {
      return history.push(`/specialists/${user.id}`);
    }
    return history.push(`/users/${user.id}`);
  };

  if (!events) {
    return <div />;
  }

  return (
    <div className={s.logs}>
      <div className={s.list}>
        {events.map(log => (
          <Log
            key={log.id}
            log={log}
            onClickUser={() => {
              handleClickUser(log.user);
            }}
          />
        ))}
      </div>
    </div>
  );
};
