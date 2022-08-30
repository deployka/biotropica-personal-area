import React, { MouseEvent, useEffect, useState } from 'react';
import { ROLE } from '../../@types/entities/Role';
import type { Specialization } from '../../@types/entities/Specialization';
import type { Tab } from '../../shared/Global/Tabs/Tabs';

import { useGetSignUpLinkQuery } from '../../api/auth';
import {
  useGetCurrentSpecialistQuery,
  useGetFollowedUsersBySpecialistQuery,
} from '../../api/specialists';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { ProfileCard } from '../../components/Profile/Card/Card';
import { SpecialistCoursesList } from '../../components/Specialist/Courses/List';
import { SpecialistUsersList } from '../../components/Specialist/UsersList/UsersList';
import { CopyField } from '../../components/UI/CopyField/CopyField';
import { eventBus, EventTypes } from '../../services/EventBus';
import { Tabs } from '../../shared/Global/Tabs/Tabs';

import s from './Profile.module.scss';
import { useHistory, useParams } from 'react-router';

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

const tabKeys = tabs.map(tab => tab.key);

export interface Param {
  tab: string;
}

// TODO: вынести в глобальный тип
export type SpecialistData = {
  specializations: Specialization[];
  experience: string;
  education: string;
};

const Profile = () => {
  const token = localStorage.getItem('invitedToken') || '';
  const { tab } = useParams<Param>();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const {
    data: currentSpecialist,
    isLoading,
    isError,
  } = useGetCurrentSpecialistQuery();

  const {
    data: users = [],
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetFollowedUsersBySpecialistQuery();

  useEffect(() => {
    if (!tab) {
      history.push(`/profile/${tabs[0].key}`);
    }
    if (!tabKeys.includes(tab)) {
      setActiveTab(tabs[0].key);
      history.push(tabs[0].key);
    }

    return setActiveTab(tab);
  }, [tab]);

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
        message: 'Ссылка скопирована :]',
        type: NotificationType.SUCCESS,
      });
    }
  }

  const handleClickEdit = () => {
    history.push('/profile/edit');
  };

  const onTabClick = (tab: Tab) => {
    setActiveTab(tab.key);
    history.push(`${tab.key}`);
  };

  return (
    <div className={s.backgroundWrapper}>
      <div className={s.profile}>
        <div className={s.info}>
          {currentSpecialist && (
            <>
              <ProfileCard
                userData={currentSpecialist.user}
                isEditable={true}
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
                onActiveTabChanged={() => console.log('test')}
                spaceBetween={50}
                onTabClick={onTabClick}
              />
            </div>
          </div>
          {activeTab === tabs[0].key && (
            <SpecialistCoursesList coursesList={courses} />
          )}
          {activeTab === tabs[1].key && (
            <SpecialistUsersList
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

export default Profile;
