import React from 'react';

import s from './Profile.module.scss';

import Card from './components/Card/Card';
import { Post } from './components/Post/Post';
import Button from '../../components/Button/Button';
import { eventBus, EventTypes } from '../../services/EventBus';
import { useParams } from 'react-router-dom';
import { useCurrentUserQuery } from '../../api/user';
import {
  useGetCurrentSpecialistQuery,
  useGetOneSpecialistQuery,
} from '../../api/specialists';
import { ROLE } from '../../@types/entities/Role';
import { useCreateDialogMutation } from '../../api/chat';

const Profile = () => {
  const {
    data: currentSpecialist,
    isLoading,
    isError,
  } = useGetCurrentSpecialistQuery();
  const [createDialog] = useCreateDialogMutation();

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

  async function sendMessage() {
    if (!currentSpecialist) return;
    const dialog = await createDialog({
      userId: currentSpecialist.id,
    }).unwrap();
    eventBus.emit(EventTypes.chatOpen, dialog.id);
  }

  return (
    <div className={s.backgroundWrapper}>
      <div className={s.profile}>
        <div className={s.info}>
          {currentSpecialist && (
            <Card specialist={currentSpecialist} isEditable={true} />
          )}
        </div>

        {courses && (
          <div className={s.courses}>
            <div className={s.title}>
              <h3>Курсы повышения квалификации</h3>
              {courses.length ? (
                <div className={s.postList}>
                  {/* {courses.map((course, i) => (
                    <Post
                      key={i}
                      title={course.title}
                      description={course.description}
                      date={course.date}
                    />
                  ))} */}
                </div>
              ) : (
                <p className={s.emptyData}>Нет данных</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
