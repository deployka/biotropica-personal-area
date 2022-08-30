import React, { MouseEvent, useEffect, useState } from 'react';
import { ROLE } from '../../@types/entities/Role';
import { Specialization } from '../../@types/entities/Specialization';
import { useGetSignUpLinkQuery } from '../../api/auth';
import { useGetCurrentSpecialistQuery } from '../../api/specialists';
import { useGetAllUsersQuery } from '../../api/user';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { ProfileCard } from '../../components/Profile/Card/Card';
import { SpecialistCoursesList } from '../../components/Specialist/Courses/List';
import { SpecialistUsersList } from '../../components/Specialist/UsersList/UsersList';
import { Tab } from '../../components/TabButtons/TabButtons';
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
    value: 'Мои пездюки',
  },
];

// TODO: вынести в глобальный тип
export type SpecialistData = {
  specializations: Specialization[];
  experience: string;
  education: string;
};

const Profile = () => {
  const token = localStorage.getItem('invitedToken') || '';
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const {
    data: currentSpecialist,
    isLoading,
    isError,
  } = useGetCurrentSpecialistQuery();

  const { data: users = [] } = useGetAllUsersQuery({
    roles: [ROLE.CLIENT],
  });

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
                onTabClick={tab => setActiveTab(tab.key)}
              />
            </div>
          </div>
          {activeTab === tabs[0].key && (
            <SpecialistCoursesList coursesList={courses} />
          )}
          {activeTab === tabs[1].key && <SpecialistUsersList users={users} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
