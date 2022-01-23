import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserLoadingStatus,
  selectUserResponse,
} from '../../../store/ducks/user/selectors';
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
import { LoadingStatus } from '../../../store/types';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { setUserResponse } from '../../../store/ducks/user/actionCreators';

interface Props {
  isPublic?: boolean;
  user: User | undefined;
}

const Profile = ({ isPublic, user }: Props) => {
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

  const dispatch = useDispatch();

  const response = useSelector(selectUserResponse);
  const loadingStatus = useSelector(selectUserLoadingStatus);

  const { active } = useParams<Param>();

  const history = useHistory();

  const [activeTab, setActiveTab] = useState<string>(
    getTabByKey(active, tabs)?.key || tabs[0].key,
  );

  const tariffData = {
    name: 'стандарт',
    expires: '9 июля 2021',
  };

  useEffect(() => {
    if (loadingStatus === LoadingStatus.SUCCESS && response) {
      eventBus.emit(EventTypes.notification, {
        title: 'Внимание!',
        message: response.message,
        type: NotificationType.INFO,
        dismiss: {
          duration: 10000,
          onScreen: true,
          pauseOnHover: true,
        },
      });
      dispatch(setUserResponse(undefined));
    }
  }, [response]);

  function onTabClick(tab: Tab) {
    history.push(`/${isPublic ? 'profile' : `users/${user?.id}`}/tabs/${tab.key}`);
  }

  useEffect(() => {
    if (active) {
      setActiveTab(getTabByKey(active, tabs)?.key || activeTab);
      history.push(`/profile/tabs/${getTabByKey(active, tabs)?.key || activeTab}`);
    }
  }, [active]);
  return (
    <>
      <div className={s.profile}>
        <div className={s.info}>
          {user && <Card isPublic={isPublic} user={user} />}
          {isPublic && (
            <div className={s.userInfo}>
              <Goals />
              <Tariff tariff={tariffData} />
            </div>
          )}
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
          {activeTab === tabs[0].key && user && (
            <Recommended user={user} isPublic={isPublic} />
          )}
          {activeTab === tabs[1].key && user && (
            <TestsAndAnalyze user={user} isPublic={isPublic} />
          )}
          {activeTab === tabs[2].key && isPublic && (
            <button
              onClick={() =>
                user && openModal(ModalName.MODAL_ADD_PROGRESS_PHOTO, { user })
              }
              className={s.btn__add__photo}
            >
              добавить фото
            </button>
          )}
          {activeTab === tabs[2].key && user && (
            <Progress isPublic={isPublic} user={user} />
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
