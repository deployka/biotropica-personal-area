import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';
import { Goal as IGoal } from '../../../../store/ducks/goal/contracts/state';

import s from './Goal.module.scss';
interface Props {
  goal: IGoal;
  active: number;
  setActive: Dispatch<SetStateAction<IGoal>>;
}

export const Goal = ({ goal, active, setActive }: Props) => {
  return (
    <div
      onClick={() => setActive(goal)}
      className={classNames(s.goal, {
        [s.active]: goal.id === active,
      })}
    >
      <div className={s.goal__title}>{goal.name}</div>
    </div>
  );
};
