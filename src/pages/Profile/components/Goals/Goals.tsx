import React from 'react';
import { Link } from 'react-router-dom';
import s from './Goals.module.scss';

type Props = {
  goals: Goal[];
};

export const Goals = ({ goals }: Props) => {
  return (
    <Link style={{ textDecoration: 'none' }} className={s.goals} to="/goals">
      Активных целей: {goals.length}
    </Link>
  );
};
