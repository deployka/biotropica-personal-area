import React from 'react';
import { Goal } from '../components/Goal/Goal';

import s from './Goals.module.scss';

interface Props {
  goals: any; //TODO:
}

export const Header = ({ goals }: Props) => {
  return (
    <div className={s.goals__header}>
      <div className={s.goals__container}>
        {goals.map((goal: any, index: number) => (
          <Goal key={index + goal.target} goal={goal} />
        ))}
      </div>
      <button className={s.btn__create__goal}>Создать новую цель</button>
    </div>
  );
};
