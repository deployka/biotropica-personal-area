import React from 'react';
import s from './Goals.module.scss';

type Props = {
  goalsCount: number;
};

export const Goals = ({ goalsCount }: Props) => {
  return <div className={s.goals}>Активных целей: {goalsCount}</div>;
};
