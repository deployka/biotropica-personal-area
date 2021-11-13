import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../store/ducks/user/selectors';
import { Card } from '../components/Card/Card';
import { Tariff } from '../components/Tariff/Tariff';
import { Goals } from '../components/Goals/Goals';
import { Progress } from '../components/Progress/Progress';
import { Recommended } from '../components/Recommended/Recommended';
import { TestsAndAnalyze } from '../components/TestsAndAnalyze/TestsAndAnalyze';

import s from './Profile.module.scss';
import { useModal } from '../../../hooks/useModal';
import { ModalName } from '../../../providers/ModalProvider';
import { useHistory, useParams } from 'react-router';
import { Param } from './Edit';
import { Tab, Tabs } from '../../../shared/Global/Tabs/Tabs';
import { getTabByKey } from '../../../utils/tabsHelper';

const Profile = () => {
  const { openModal } = useModal();

  const tabs: Tab[] = [
    {
      key: 'recommended',
      value: 'Рекомендации',
    },
    {
      key: 'test-analyzes',

      value: 'Тестирование и Анализы',
    },
    {
      key: 'progress',
      value: 'Прогресс',
    },
  ];

  const user = useSelector(selectUserData);

  const { active } = useParams<Param>();
  const history = useHistory();

  const [activeTab, setActiveTab] = useState<string>(
    getTabByKey(active, tabs)?.key || tabs[0].key
  );

  const TariffData = {
    name: 'стандарт',
    expires: '9 июля 2021',
  };

  useEffect(() => {
    history.push(`/profile/tabs/${activeTab}`);
  }, [activeTab]);

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
                onActiveTabChanged={setActiveTab}
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

export default Profile;
