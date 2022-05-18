import React from 'react';

import s from './Logs.module.scss';

import { Log } from '../components/Log/Log';
import { useRequestUserEventsQuery } from '../../../store/rtk/requests/user-events';

export const Logs = () => {
  const { data: events } = useRequestUserEventsQuery();

  if (!events) {
    return <div/>;
  }

  return (
    <div className={s.logs}>
      <table className={s.logsContainer}>
        <tbody>
          {events.map(log => (
            <Log key={log.id} log={log}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};
