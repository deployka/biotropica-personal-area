import React from 'react';
import s from './RoleSwitch.module.scss';
import { RoleCard } from './RoleCard';
import { SportsmenSvg } from '../../../../utils/svgIcons/SportsmenSvg';
import { TrainerSvg } from '../../../../utils/svgIcons/TrainerSvg';

type RoleSwitchType = {
  onClick: (role: 'trainer' | 'sportsman') => void;
};

export const RoleSwitch = ({ onClick }: RoleSwitchType) => {
  return (
    <div className={s.switchContainer}>
      <RoleCard
        Logo={<SportsmenSvg />}
        title="Я - спортсмен"
        onClick={() => onClick('sportsman')}
      />
      <RoleCard
        Logo={<TrainerSvg />}
        title="Я - специалист/тренер"
        onClick={() => onClick('trainer')}
      />
    </div>
  );
};
