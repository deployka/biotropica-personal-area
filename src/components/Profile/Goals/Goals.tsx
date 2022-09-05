import React from 'react';
import { Loader } from '../../../shared/Form/Loader/Loader';
import s from './Goals.module.scss';

type Props = {
  isLoading?: boolean;
  goalsCount: number;
  onMoveToGoals?: () => void;
};

export const ProfileGoals = ({
  isLoading,
  goalsCount,
  onMoveToGoals,
}: Props) => {
  if (isLoading) {
    return (
      <div className={s.goals}>
        <Loader color="#6f61d0" />
      </div>
    );
  }
  return (
    <div onClick={onMoveToGoals} className={s.goals}>
      Активных целей: {goalsCount}
    </div>
  );
};
