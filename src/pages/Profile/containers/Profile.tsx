import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card } from '../components/Card/Card';
import { Tariff } from '../components/Tariff/Tariff';
import { Goals } from '../components/Goals/Goals';
import { Progress } from '../components/Progress/Progress';
import { TestsAndAnalyze } from '../components/TestsAndAnalyze/TestsAndAnalyze';

import s from './Profile.module.scss';
import { useModal } from '../../../hooks/useModal';
import { ModalName } from '../../../providers/ModalProvider';
import { useHistory, useParams } from 'react-router';
import { Param } from './Edit';
import { Tab, Tabs } from '../../../shared/Global/Tabs/Tabs';
import { getTabByKey } from '../../../utils/tabsHelper';
import { Button } from '../components/Button/Button';
import { Client } from '../../../@types/entities/Client';
import { useGetGoalsQuery } from '../../../api/goals';

interface Props {
  user: Client;
}

const Profile = ({ user }: Props) => {
  const { openModal } = useModal();

  const tabs: Tab[] = [
    {
      key: 'test-analyzes',
      value: 'Тестирование и Анализы',
    },
    {
      key: 'progress',
      value: 'Прогресс',
    },
  ];

  const { data: goals = [] } = useGetGoalsQuery();

  const { active } = useParams<Param>();

  const history = useHistory();

  const [activeTab, setActiveTab] = useState<string>(
    getTabByKey(active, tabs)?.key || tabs[0].key,
  );

  // FIXME: добавить отображение тарифа
  const tariffData = {
    name: 'стандарт',
    expires: '9 июля 2021',
  };

  function onTabClick(tab: Tab) {
    history.push(`/profile/tabs/${tab.key}`);
  }

  function openModalHandler() {
    openModal(ModalName.MODAL_ADD_PROGRESS_PHOTO, { user });
  }

  useEffect(() => {
    if (active) {
      setActiveTab(getTabByKey(active, tabs)?.key || activeTab);
      history.push(
        `/profile/tabs/${getTabByKey(active, tabs)?.key || activeTab}`,
      );
    }
  }, [active]);

  function moveToTasks() {
    history.push('/');
  }

  return (
    <>
      <div className={s.profile}>
        <div className={s.info}>
          <Card user={user} />
          <div className={s.userInfo}>
            <Goals goalsLength={goals.length} />
            <Tariff tariff={tariffData} />
          </div>
          <div className={s.moveToTasks}>
            <Button onClick={moveToTasks}>Задачи и рекомендации</Button>
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
                onTabClick={onTabClick}
              />
            </div>
          </div>
          {activeTab === tabs[0].key && <TestsAndAnalyze user={user} />}
          {activeTab === tabs[1].key && (
            <button onClick={openModalHandler} className={s.btn__add__photo}>
              добавить фото
            </button>
          )}
          {activeTab === tabs[1].key && <Progress user={user} />}
        </div>
      </div>
    </>
  );
};

export default Profile;
