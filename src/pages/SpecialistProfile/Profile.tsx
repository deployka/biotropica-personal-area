import React from 'react';
import { Specialization } from '../../@types/entities/Specialization';
import { useGetCurrentSpecialistQuery } from '../../api/specialists';
import { ProfileCard } from '../../components/Profile/Card/Card';
import { SpecialistCoursesList } from '../../components/Specialist/Courses/List';
import { CopyField } from '../../components/UI/CopyField/CopyField';

import s from './Profile.module.scss';

// TODO: вынести в глобальный тип
export type SpecialistData = {
  specializations: Specialization[];
  experience: string;
  education: string;
};

const Profile = () => {
  const {
    data: currentSpecialist,
    isLoading,
    isError,
  } = useGetCurrentSpecialistQuery();

  console.log('currentUser', currentSpecialist);

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
                label="Ссылка для регистрации"
                text="https://www.figma.com/file/iLjiEdTh5mBXeeZnNTQm5v/BioTropika-%F0%9F%8C%B1-2-integration-(Copy)-(Copy)?node-id=7324%3A48483"
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
