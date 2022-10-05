import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useGetFollowedUsersQuery } from '../../api/user';
import { getTabByKey } from '../../utils/tabsHelper';
import { SpecialistCard } from '../../components/Profile/Card/SpecialistCard';
import type { Specialization } from '../../@types/entities/Specialization';
import type { Tab } from '../../shared/Global/Tabs/Tabs';

import { useGetSignUpLinkQuery } from '../../api/auth';
import { useGetCurrentSpecialistQuery } from '../../api/specialists';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { SpecialistCoursesList } from '../../components/Specialist/Courses/List';
import { UsersListTab } from '../../components/UsersListTab/Tab';
import { CopyField } from '../../components/UI/CopyField/CopyField';
import { eventBus, EventTypes } from '../../services/EventBus';
import { Tabs } from '../../shared/Global/Tabs/Tabs';

import s from './Profile.module.scss';

const tabs: Tab[] = [
  {
    key: 'courses',
    value: 'Курсы',
  },
  {
    key: 'users',
    value: 'Пользователи',
  },
];

export interface Param {
  active: string;
}

// TODO: вынести в глобальный тип
export type SpecialistData = {
  specializations: Specialization[];
  experience: string;
  education: string;
};

const PrivateSpecialistProfile = () => {
  const token = localStorage.getItem('invitedToken') || '';
  const { active } = useParams<Param>();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(
    getTabByKey(active, tabs)?.key || tabs[0].key,
  );
  const {
    data: currentSpecialist,
    isLoading,
    isError,
  } = useGetCurrentSpecialistQuery();

  const currentSpecialistId = currentSpecialist?.user?.id || 0;
  const {
    data: users = [],
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetFollowedUsersQuery(
    { id: currentSpecialistId },
    { skip: !currentSpecialistId || activeTab !== tabs[1].key },
  );

  const { data } = useGetSignUpLinkQuery(
    {
      userId: currentSpecialist?.user.id || -1,
      token,
    },
    { skip: !currentSpecialist },
  );

  useEffect(() => {
    if (data?.link) {
      localStorage.setItem('invitedToken', data.link.split('invitedToken=')[1]);
    }
  }, [data?.link]);

  useEffect(() => {
    if (active) {
      setActiveTab(getTabByKey(active, tabs)?.key || activeTab);
      history.push(
        `/profile/tabs/${getTabByKey(active, tabs)?.key || activeTab}`,
      );
    }
  }, [active]);

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (!isLoading && isError) {
    return <p>Произошла ошибка</p>;
  }

  if (!currentSpecialist) {
    return <p>Произошла ошибка</p>;
  }

  const courses = currentSpecialist.courses;
  const specialistData = {
    education: currentSpecialist.education,
    experience: currentSpecialist.experience,
    specializations: currentSpecialist.specializations,
  };

  function onCopyLink(text: string) {
    if (text) {
      eventBus.emit(EventTypes.notification, {
        message: 'Ссылка скопирована',
        type: NotificationType.SUCCESS,
      });
    }
  }

  const handleClickEdit = () => {
    history.push('/profile/edit');
  };

  const onTabClick = (tab: string) => {
    setActiveTab(tab);
    history.push(`/profile/tabs/${tab}`);
  };

  return (
    <div className={s.backgroundWrapper}>
      <div className={s.profile}>
        <div className={s.info}>
          {currentSpecialist && (
            <>
              <SpecialistCard
                user={currentSpecialist.user}
                isPublic={false}
                specialistData={specialistData}
                profilePhoto={currentSpecialist.user.profilePhoto || ''}
                onEditClick={handleClickEdit}
              />
              <CopyField
                onClick={onCopyLink}
                label="Ссылка для регистрации"
                text={data?.link || 'Ссылка не найдена'}
              />
            </>
          )}
        </div>
        <div className={s.content}>
          <div className={s.tabs__container}>
            <div className={s.horizontalScroll}>
              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onActiveTabChanged={onTabClick}
                spaceBetween={50}
              />
            </div>
          </div>
          {activeTab === tabs[0].key && (
            <SpecialistCoursesList coursesList={courses} />
          )}
          {activeTab === tabs[1].key && (
            <UsersListTab
              isLoading={isUsersLoading}
              isError={isUsersError}
              users={users}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivateSpecialistProfile;
