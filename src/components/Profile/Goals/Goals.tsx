import React from 'react';
import s from './Goals.module.scss';

type Props = {
  goalsCount: number;
};

export const ProfileGoals = ({ goalsCount }: Props) => {
  return <div className={s.goals}>Активных целей: {goalsCount}</div>;
};
