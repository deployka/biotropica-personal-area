import classNames from "classnames";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  CreateGoalData,
  GoalType,
} from "../../../../store/ducks/goal/contracts/state";

import s from "./AddGoalSelect.module.scss";

export interface Selector {
  title: string;
  desc: string;
  type: GoalType;
}

interface Props {
  item: Selector;
  goal: CreateGoalData;
  setGoal: Dispatch<SetStateAction<CreateGoalData>>;
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
      <div className={s.selector__content}>
        <div className={s.selector__title}>{item.title}</div>
        <div className={s.selector__description}>{item.desc}</div>
      </div>
    </div>
  );
};
