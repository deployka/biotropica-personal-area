import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../store/ducks/user/selectors';
import { Card } from '../components/Card/Card';
import { Tariff } from '../components/Tariff/Tariff';
import { Goals } from '../components/Goals/Goals';
import { Progress } from '../components/Progress/Progress';
import { Recommended } from '../components/Recommended/Recommended';
import { Tabs } from '../components/Tabs/Tabs';
import { TestsAndAnalyze } from '../components/TestsAndAnalyze/TestsAndAnalyze';
import { Tab } from '../pages/Edit/container/Edit';

import s from './Profile.module.scss';

interface Props {}

export const Profile = (props: Props) => {
  const tabs: Tab[] = [
    {
      key: 'recommended',
      value: 'Рекомендации',
    },
    {
      key: 'test',
      value: 'Тестирование и Анализы',
    },
    {
      key: 'progress',
      value: 'Прогресс',
    },
  ];

  const user = useSelector(selectUserData);

  const [activeTab, setActiveTab] = useState<string>(tabs[0].key);

  const GoalsData = {
    amount: 3,
  };

  const TariffData = {
    name: 'стандарт',
    expires: '9 июля 2021',
  };

  return (
    <>
      <div className={s.profile}>
        <div className={s.profile__info}>
          {user && <Card user={user} />}
          <Goals Goals={GoalsData} />
          <Tariff Tariff={TariffData} />
        </div>
        <div className={s.content}>
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === tabs[0].key && user && <Recommended user={user} />}
          {activeTab === tabs[1].key && user && <TestsAndAnalyze user={user} />}
          {activeTab === tabs[2].key && user && <Progress user={user} />}
          {activeTab === tabs[2].key && (
            <button className={s.btn__add__photo}>добавить фото</button>
          )}
        </div>
      </div>
    </>
  );
};
