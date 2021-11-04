import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "../../../../shared/Form/Button/Button";
import {
  CreateGoalData,
  Goal,
  GoalType,
} from "../../../../store/ducks/goal/contracts/state";
import { selectGoalsData } from "../../../../store/ducks/goals/selectors";

import s from "./AddGoalSelect.module.scss";
import { Selector, SelectorItem } from "./Selector";

interface Props {
  goal: CreateGoalData;
  setGoal: Dispatch<SetStateAction<CreateGoalData>>;
  setNext: Dispatch<SetStateAction<boolean>>;
}

export const AddGoalSelect = ({ goal, setGoal, setNext }: Props) => {
  const goals: Goal[] = useSelector(selectGoalsData) || [];
  const history = useHistory();

  const selectors: Selector[] = [
    {
      type: GoalType.WEIGHT,
      title: "Изменение веса",
      desc: "Сбросить вес или набрать вес",
    },
    {
      type: GoalType.RUN,
      title: "Бег",
      desc: "Пробежать определённую дистанцию",
    },
    {
      type: GoalType.FORCE,
      title: "Силовые показатели",
      desc: "  Поднимать определенные веса",
    },
  ];

  function discard() {
    if (!goals.length) {
      history.push("/");
      return;
    }
    history.push("/goals");
  }

  return (
    <div className={s.addGoals}>
      <div className={s.wrapper}>
        <h2 className={s.title}>
          Выберите направление, в котором хотите добиться успеха
        </h2>
        <div className={s.selectorsContainer}>
          {selectors.map((item: Selector) => (
            <SelectorItem
              key={item.type}
              item={item}
              type={item.type}
              setGoal={setGoal}
              goal={goal}
            />
          ))}
        </div>
        <div className={s.buttons}>
          <Button
            options={{
              width: "100px",
              height: "30px",
              classes: { discard: true },
              content: "Отмена",
            }}
            onClick={discard}
          />
          <Button
            onClick={() => setNext(true)}
            options={{ content: "Далее", width: "100px", height: "30px" }}
          />
        </div>
      </div>
    </div>
  );
};
