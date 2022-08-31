import React, { ReactNode } from 'react';
import { BaseUser } from '../../../@types/entities/BaseUser';
import { CurrentTariff } from '../../../@types/entities/Tariff';
import { ProfileCard } from '../../Profile/Card/Card';
import { ProfileGoals } from '../../Profile/Goals/Goals';
import { ProfileTariff } from '../../Profile/Tariffs/Tariff';

import s from './Client.module.scss';

type Props = {
  user: BaseUser;
  isPublic: boolean;
  goalsCount: number;
  children: ReactNode;
  currentTariff?: CurrentTariff;
  onEditClick: () => void;
  onClickBuyTariff: () => void;
  onClickPayTariff: () => void;
};

export const ClientProfileLayout = ({
  user,
  isPublic,
  goalsCount,
  children,
  currentTariff,
  onEditClick,
  onClickBuyTariff,
  onClickPayTariff,
}: Props) => {
  return (
    <div className={s.profile}>
      <div className={s.info}>
        <ProfileCard
          user={user}
          isPublic={isPublic}
          onEditClick={onEditClick}
        />
        <div className={s.statistics}>
          <ProfileGoals goalsCount={goalsCount} />
          <ProfileTariff
            title={currentTariff?.tariff?.title}
            expires={currentTariff?.expiredAt}
            isPaid={currentTariff?.isPaid}
            onClickBuyTariff={onClickBuyTariff}
            onClickPayTariff={onClickPayTariff}
          />
        </div>
      </div>
      <div className={s.content}>{children}</div>
    </div>
  );
};
