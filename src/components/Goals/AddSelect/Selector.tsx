import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';

import s from './Selector.module.scss';
import { GoalType } from '../../../@types/entities/Goal';
import { CreateGoalFormDto } from '../../../@types/dto/goals/create-form.dto';

export interface Selector {
  title: string;
  desc: string;
  type: GoalType;
}

interface Props {
  item: Selector;
  goal: CreateGoalFormDto;
  setGoal: Dispatch<SetStateAction<CreateGoalFormDto>>;
  type: GoalType;
}

export const SelectorItem = ({ item, type, setGoal, goal }: Props) => {
  return (
    <div
      className={classNames(s.selector, {
        [s.active]: goal.type === type,
      })}
      onClick={() => setGoal({ ...goal, type: item.type })}
    >
      <div className={s.wrapper}>
        <div className={s.title}>{item.title}</div>
        <div className={s.description}>{item.desc}</div>
      </div>
    </div>
  );
};
