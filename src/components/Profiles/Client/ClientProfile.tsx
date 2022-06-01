import React from 'react';

import { Tab, Tabs } from '../../../shared/Global/Tabs/Tabs';
import { User } from '../../../store/ducks/user/contracts/state';
import { ProfileCard } from '../../Profile/Card/Card';
import { ProfileGoals } from '../../Profile/Goals/Goals';
import { ProfileTariff } from '../../Profile/Tariff/Tariff';

type Props = {
  user: User;
  tabs: Tab[];
  goals: Goal[];
  activeTab: string;
  tariffData: { name: string; expires: string };
  moveToTasks: () => void;
  onTabClick: (tab: Tab) => void;
  setActiveTab: (activeTab: string) => void;
};

import s from './UserProfile.module.scss';

const ClientProfile = ({
  user,
  tabs,
  activeTab,
  goals,
  tariffData,
  setActiveTab,
  onTabClick,
  moveToTasks,
}: Props) => {
  return (
    <div className={s.profile}>
      <div className={s.info}>
        <ProfileCard user={user} />
        <div className={s.userInfo}>
          <ProfileGoals goalsLength={goals.length} />
          <ProfileTariff tariff={tariffData} />
        </div>
        <div className={s.moveToTasks}>
          <button onClick={moveToTasks}>Задачи и рекомендации</button>
        </div>
      </div>
      <div className={s.content}></div>
    </div>
  );
};
