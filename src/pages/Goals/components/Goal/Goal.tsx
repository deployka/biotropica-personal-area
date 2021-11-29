import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router';
import { Goal as IGoal } from '../../../../store/ducks/goal/contracts/state';

import s from './Goal.module.scss';
interface Props {
  goal: IGoal;
  active: number;
}

export const Goal = ({ goal, active }: Props) => {
  const history = useHistory();
  return (
    <>
      {goal && (
        <div
          onClick={() => {
            history.push(`/goals/${goal.id}`);
          }}
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
