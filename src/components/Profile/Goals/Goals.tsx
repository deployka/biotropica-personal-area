import React from 'react';
import { Link } from 'react-router-dom';
import s from './Goals.module.scss';

type Props = {
  goalsLength: number;
};

export const ProfileGoals = ({ goalsLength }: Props) => {
  return (
    <Link style={{ textDecoration: 'none' }} className={s.goals} to="/goals">
      Активных целей: {goalsLength}
    </Link>
  );
};
