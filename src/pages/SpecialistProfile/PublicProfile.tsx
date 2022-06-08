import React from 'react';
import { useParams } from 'react-router';
import { ResponseError } from '../../@types/api/response';
import { Specialization } from '../../@types/entities/Specialization';
import { useCreateDialogMutation } from '../../api/chat';
import { useGetOneSpecialistQuery } from '../../api/specialists';
import Button from '../../components/Button/Button';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { ProfileCard } from '../../components/Profile/Card/Card';
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
  const [createDialog] = useCreateDialogMutation();

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (!isLoading && isError) {
    return <p>Произошла ошибка</p>;
  }

  // FIXME:
  if (!specialist) {
    return <p>Произошла ошибка</p>;
  }

  const handleCreateDialog = async () => {
    try {
      await createDialog({ userId: specialist.id }).unwrap();
      eventBus.emit(EventTypes.chatOpen, specialist.id);
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        title: 'Произошла ошибка!',
        message: (error as ResponseError).data.message,
        type: NotificationType.DANGER,
        dismiss: {
          duration: 10000,
        },
      });
    }
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
          <ProfileCard
            userData={specialist.user}
            isEditable={false}
            specialistData={specialistData}
            profilePhoto={specialist.user.profilePhoto || ''}
          />
          <Button onClick={handleCreateDialog}>Начать чат</Button>
        </div>

        {courses && <SpecialistCoursesList coursesList={courses} />}
      </div>
    </div>
  );
};

export default PublicSpecialistProfile;
