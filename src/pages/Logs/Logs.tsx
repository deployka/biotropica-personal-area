import React from 'react';
import { useHistory } from 'react-router';

import type { BaseUser } from '../../@types/entities/BaseUser';

import { useRequestUserEventsQuery } from '../../api/user-events';
import { LogItem } from '../../components/Logs/Item/Item';

import s from './Logs.module.scss';

const Logs = () => {
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

  console.log(events);

  return (
    <div className={s.logs}>
      <div className={s.list}>
        {events.map(log => (
          <LogItem
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

export default Logs;
