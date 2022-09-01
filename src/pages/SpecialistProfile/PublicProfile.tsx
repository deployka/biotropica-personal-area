import React from 'react';
import { useParams } from 'react-router';
import { Specialization } from '../../@types/entities/Specialization';
import { useGetAllDialogsQuery } from '../../api/chat';
import { useGetOneSpecialistQuery } from '../../api/specialists';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { SpecialistCoursesList } from '../../components/Specialist/Courses/List';
import { eventBus, EventTypes } from '../../services/EventBus';

import s from './Profile.module.scss';

// TODO: вынести в глобальный тип
export type SpecialistData = {
  specializations: Specialization[];
  experience: string;
  education: string;
};

const PublicSpecialistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const specialistId = +id;
  const {
    data: specialist,
    isLoading,
    isError,
  } = useGetOneSpecialistQuery({ id: specialistId });

  const { data: dialogs } = useGetAllDialogsQuery();

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
          {/* <ProfileCard
            userData={specialist.user}
            isEditable={false}
            specialistData={specialistData}
            profilePhoto={specialist.user.profilePhoto || ''}
          /> */}
          <button className={s.chatButton} onClick={handleCreateDialog}>
            Начать чат
          </button>
        </div>

        {courses && <SpecialistCoursesList coursesList={courses} />}
      </div>
    </div>
  );
};

export default PublicSpecialistProfile;
