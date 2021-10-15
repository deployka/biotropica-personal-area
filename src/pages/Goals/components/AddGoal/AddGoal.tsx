import React, { useState } from 'react';
import {
  CreateGoalData,
  GoalType,
} from '../../../../store/ducks/goal/contracts/state';

import { AddGoalForm } from '../AddGoalForm/AddGoalForm';
import { AddGoalSelect } from '../AddGoalSelect/AddGoalSelect';

import s from './AddGoal.module.scss';

interface Props {}

export const AddGoal = ({}: Props) => {
  const [goal, setGoal] = useState<CreateGoalData>({
    type: GoalType.WEIGHT,
    units: [{ label: '', value: null }],
    description: '',
    end_result: '',
    start_result: '',
    name: '',
  });

  const [next, setNext] = useState(false);

  return (
    <div className={s.add__goal}>
      {!next && (
        <AddGoalSelect goal={goal} setNext={setNext} setGoal={setGoal} />
      )}
      {next && <AddGoalForm goalTemplate={goal} setNext={setNext} />}
    </div>
  );
};
