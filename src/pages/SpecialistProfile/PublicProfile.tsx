import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { BaseUser } from '../../@types/entities/BaseUser';
import { Specialist } from '../../@types/entities/Specialist';
import { Specialization } from '../../@types/entities/Specialization';
import { useGetAllDialogsQuery } from '../../api/chat';
import { useGetOneSpecialistQuery } from '../../api/specialists';
import { useGetFollowedUsersQuery } from '../../api/user';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { SpecialistCard } from '../../components/Profile/Card/SpecialistCard';
import { SpecialistCoursesList } from '../../components/Specialist/Courses/List';
import { UsersListTab } from '../../components/UsersListTab/Tab';
import { eventBus, EventTypes } from '../../services/EventBus';
import { Tab, Tabs } from '../../shared/Global/Tabs/Tabs';
import {
  selectCurrentUser,
  selectIsAdmin,
  selectIsDoctor,
} from '../../store/slices/authSlice';
import { useAppSelector } from '../../store/storeHooks';
import { getTabByKey } from '../../utils/tabsHelper';

import s from './Profile.module.scss';

// TODO: вынести в глобальный тип
export type SpecialistData = {
  specializations: Specialization[];
  experience: string;
  education: string;
};

type Params = {
  id: string;
  active: string;
};

const PublicSpecialistProfile = () => {
  const { id, active } = useParams<Params>();
  const history = useHistory();
  const specialistId = +id;
  const {
    data: specialist,
    isLoading,
    isError,
  } = useGetOneSpecialistQuery({ id: specialistId });

  const isAdmin = useSelector(selectIsAdmin);
  const isSpecialist = useSelector(selectIsDoctor);

  const currentUser = useAppSelector(selectCurrentUser);

  const tabs: Tab[] = [
    {
      key: 'courses',
      value: 'Курсы',
    },
    {
      key: 'users',
      value: 'Пользователи',
      isHidden: !isAdmin || !isSpecialist,
    },
  ];

  const userId = specialist?.user?.id || 0;

  const [activeTab, setActiveTab] = useState(
    getTabByKey(active, tabs)?.key || tabs[0].key,
  );

  const {
    data: clients = [],
    isLoading: isClientsLoading,
    isError: isClientsError,
  } = useGetFollowedUsersQuery(
    { id: userId },
    // FIXME: жесткие хардкоды. Уберу, когда настрою логиков табов в другом реквесте
    { skip: !userId || activeTab === tabs[1].key || !isAdmin || !isSpecialist },
  );

  const { data: dialogs } = useGetAllDialogsQuery();

  const handleClickEdit = () => {
    history.push('/edit');
  };

  const onTabClick = (tab: string) => {
    setActiveTab(tab);
    history.push(`/specialists/${id}/tabs/${tab}`);
  };

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (!isLoading && isError) {
    return <p>Произошла ошибка</p>;
  }

  // FIXME:
  if (!specialist) {
    return <p>Специалист не найден</p>;
  }

  if ((currentUser as BaseUser)?.specialist?.id === specialist.id) {
    history.push('/profile');
  }

  const handleCreateDialog = async () => {
    const dialogId =
      dialogs?.find(d => d.participants.find(p => p.id === specialist.user.id))
        ?.id || -1;

    try {
      if (dialogId === -1) {
        eventBus.emit(EventTypes.notification, {
          title: 'Произошла ошибка!',
          message: 'У вас нет доступа :[',
          type: NotificationType.DANGER,
        });
        return;
      }
      eventBus.emit(EventTypes.chatOpen, dialogId);
    } catch (error) {}
  };

  const courses = specialist.courses;
  const specialistData = {
    education: specialist.education,
    experience: specialist.experience,
    specializations: specialist.specializations,
  };

  return (
    <div className={s.backgroundWrapper}>
      <div className={s.profile}>
        <div className={s.info}>
          <SpecialistCard
            user={specialist.user}
            isPublic={true}
            specialistData={specialistData}
            profilePhoto={specialist.user.profilePhoto || ''}
            onEditClick={handleClickEdit}
          />
          <button className={s.chatButton} onClick={handleCreateDialog}>
            Начать чат
          </button>
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
              isLoading={isClientsLoading}
              isError={isClientsError}
              users={clients}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicSpecialistProfile;
