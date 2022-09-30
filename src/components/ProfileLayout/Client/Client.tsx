import React, { PropsWithChildren, ReactNode } from 'react';
import { useHistory } from 'react-router';
import { BaseUser } from '../../../@types/entities/BaseUser';
import { CurrentTariff } from '../../../@types/entities/Tariff';
import { Tab, Tabs } from '../../../shared/Global/Tabs/Tabs';
import Button from '../../Button/Button';
import { ProfileCard } from '../../Profile/Card/UserCard';
import { ProfileGoals } from '../../Profile/Goals/Goals';
import { ProfileTariff } from '../../Profile/Tariffs/Tariff';

import s from './Client.module.scss';

type Props = PropsWithChildren<{
  user: BaseUser;
  tabs: Tab[];
  activeTab: string;
  isPublic: boolean;
  goalsCount: number;
  isGoalsLoading?: boolean;
  currentTariff?: CurrentTariff;
  onEditClick?: () => void;
  onClickBuyTariff?: () => void;
  onClickPayTariff?: () => void;
  onActiveTabChange: (tabKey: string) => void;
  onMoveToTasks?: () => void;
}>;

export const ClientProfileLayout = ({
  user,
  tabs,
  children,
  isPublic,
  activeTab,
  goalsCount,
  currentTariff,
  isGoalsLoading,
  onActiveTabChange,
  onEditClick,
  onClickBuyTariff,
  onMoveToTasks,
}: Props) => {
  const history = useHistory();
  const handleMoveToGoal = () => {
    history.push('/goals');
  };

  return (
    <div className={s.profile}>
      <div className={s.info}>
        <ProfileCard
          user={user}
          isPublic={isPublic}
          onEditClick={onEditClick}
        />
        <div className={s.statistics}>
          {!isPublic && (
            <ProfileGoals
              isLoading={isGoalsLoading}
              onMoveToGoals={handleMoveToGoal}
              goalsCount={goalsCount}
            />
          )}
          <ProfileTariff
            title={currentTariff?.tariff?.title}
            expires={currentTariff?.expiredAt}
            isPaid={currentTariff?.isPaid}
            onClickBuyTariff={onClickBuyTariff}
          />
          {isPublic && (
            <Button
              isPrimary
              className={s.moveToTasksBtn}
              onClick={onMoveToTasks}
            >
              Задачи и рекомендации
            </Button>
          )}
        </div>
      </div>
      <div className={s.content}>
        <div className={s.tabs__container}>
          <div className={s.horizontalScroll}>
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onActiveTabChanged={onActiveTabChange}
              spaceBetween={50}
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
