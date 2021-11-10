import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../store/ducks/user/selectors';
import { Card } from '../components/Card/Card';
import { Tariff } from '../components/Tariff/Tariff';
import { Goals } from '../components/Goals/Goals';
import { Progress } from '../components/Progress/Progress';
import { Recommended } from '../components/Recommended/Recommended';

import { Tabs } from '../../../shared/Global/Tabs/Tabs';

import { TestsAndAnalyze } from '../components/TestsAndAnalyze/TestsAndAnalyze';
import { Tab } from '../pages/Edit/container/Edit';

import s from './Profile.module.scss';
import { useModal } from '../../../hooks/UseModal';
import { ModalName } from '../../../providers/ModalProvider';

interface Props {}

export const Profile = (props: Props) => {
  const { openModal } = useModal();

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

  const TariffData = {
    name: 'стандарт',
    expires: '9 июля 2021',
  };

  return (
    <>
      <div className={s.profile}>
        <div className={s.info}>
          {user && <Card user={user} />}
          <div className={s.userInfo}>
            <Goals />
            <Tariff Tariff={TariffData} />
          </div>
        </div>
        <div className={s.content}>
          <div className={s.tabs__container}>
            <div className={s.horizontalScroll}>
              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                spaceBetween={50}
              />
            </div>
          </div>
          {activeTab === tabs[0].key && user && <Recommended />}
          {activeTab === tabs[1].key && user && <TestsAndAnalyze user={user} />}
          {activeTab === tabs[2].key && (
            <button
              onClick={() => openModal(ModalName.MODAL_ADD_PROGRESS_PHOTO)}
              className={s.btn__add__photo}
            >
              добавить фото
            </button>
          )}
          {activeTab === tabs[2].key && user && <Progress />}
        </div>
      </div>
    </>
  );
};
