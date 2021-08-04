import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../store/ducks/user/selectors';
import { Card } from '../components/Card/Card';
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

  return (
    <div className={s.profile}>
      <div className={s.profile__info}>{user && <Card user={user} />}</div>
      <div className={s.content}>
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === tabs[0].key && user && <Recommended user={user} />}
        {activeTab === tabs[1].key && user && <TestsAndAnalyze user={user} />}
        {activeTab === tabs[2].key && user && <Progress user={user} />}
      </div>
    </div>
  );
};
