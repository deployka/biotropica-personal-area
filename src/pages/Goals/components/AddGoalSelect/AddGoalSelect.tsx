import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '../../../../shared/Form/Button/Button';
import { FormGoalData } from '../../../../store/ducks/goal/contracts/state';

import s from './AddGoalSelect.module.scss';
import { Selector, SelectorItem } from './Selector';

interface Props {
  goal: FormGoalData;
  setGoal: Dispatch<SetStateAction<FormGoalData>>;
  setNext: Dispatch<SetStateAction<boolean>>;
  selectors: Selector[];
  onDiscard: () => void;
}

export const AddGoalSelect = ({
  goal,
  setGoal,
  setNext,
  onDiscard,
  selectors,
}: Props) => {
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
              width: '100px',
              height: '30px',
              classes: { discard: true },
              content: 'Отмена',
            }}
            onClick={onDiscard}
          />
          <Button
            onClick={() => setNext(true)}
            options={{ content: 'Далее', width: '100px', height: '30px' }}
          />
        </div>
      </div>
    </div>
  );
};
