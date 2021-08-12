import React from 'react';

import s from './Goal.module.scss';
interface Props {
  goal: any;
}

export const Goal = ({ goal }: Props) => {
  return (
    <div className={s.goal}>
      <div className={s.goal__title}>{goal.title}</div>
    </div>
  );
};
