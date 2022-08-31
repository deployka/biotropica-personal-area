import React, { ReactNode } from 'react';
import { BaseUser } from '../../../@types/entities/BaseUser';
import { ProfileGoals } from '../../Profile/Goals/Goals';
import { Card } from '../../PublicProfile/components/Card/Card';
import { Goals } from '../../PublicProfile/components/Goals/Goals';

import s from './Client.module.scss';

type Props = {
  user: BaseUser;
  goalsCount: number;
  children: ReactNode;
};

export const SpecialistProfileLayout = ({
  user,
  goalsCount,
  children,
}: Props) => {
  return (
    <div className={s.profile}>
      <div className={s.info}>
        <Card user={user} />
      </div>
      <div className={s.content}>{children}</div>
    </div>
  );
};
