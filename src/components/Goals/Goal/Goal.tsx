import React from 'react';
import classNames from 'classnames';

import s from './Goal.module.scss';

interface Props {
  goal: Goal;
  active: number;
  onClick: (id: number) => void;
}

export const Goal = ({ goal, active, onClick }: Props) => {
  function clickHandler(id: number) {
    return () => onClick(id);
  }
  return (
    <>
      {goal && (
        <div
          onClick={clickHandler(goal.id)}
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
