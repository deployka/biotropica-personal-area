import React from 'react';
import s from './Goals.module.scss';

type Props = {
  goalsLength: number;
};

export const Goals = ({ goalsLength }: Props) => {
  return <div className={s.goals}>Активных целей: {goalsLength}</div>;
};
