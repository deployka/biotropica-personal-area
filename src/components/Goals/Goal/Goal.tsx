import React from 'react';
import classNames from 'classnames';

import s from './Goal.module.scss';
import { Goal as IGoal } from '../../../@types/entities/Goal';

interface Props {
  goal: IGoal;
  active: number;
  onGoalClick: (id: number) => void;
}

export const Goal = ({ goal, active, onGoalClick }: Props) => {
  return (
    <>
      {goal && (
        <div
          onClick={() => onGoalClick(goal.id)}
          className={classNames(s.goal, {
            [s.active]: goal.id === active,
          })}
        >
          <div className={s.title}>
            <p>{goal.name}</p>
          </div>
        </div>
      )}
    </>
  );
};
