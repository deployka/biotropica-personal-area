import React, { MouseEvent, useEffect, useState } from 'react';
import { Specialization } from '../../@types/entities/Specialization';
import { useGetSignUpLinkQuery } from '../../api/auth';
import { useGetCurrentSpecialistQuery } from '../../api/specialists';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { ProfileCard } from '../../components/Profile/Card/Card';
import { SpecialistCoursesList } from '../../components/Specialist/Courses/List';
import { CopyField } from '../../components/UI/CopyField/CopyField';
import { eventBus, EventTypes } from '../../services/EventBus';

import s from './Profile.module.scss';

// TODO: вынести в глобальный тип
export type SpecialistData = {
  specializations: Specialization[];
  experience: string;
  education: string;
};

const Profile = () => {
  const token = localStorage.getItem('invitedToken') || '';

  const {
    data: currentSpecialist,
    isLoading,
    isError,
  } = useGetCurrentSpecialistQuery();

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

        {courses && <SpecialistCoursesList coursesList={courses} />}
      </div>
    </div>
  );
};

export default Profile;
