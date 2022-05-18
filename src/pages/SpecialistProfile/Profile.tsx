import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import s from './Profile.module.scss';

import Card from './components/Card/Card';
import { Post } from './components/Post/Post';
import { ROLE } from '../../store/rtk/types/user';
import Button from '../../components/Button/Button';
import { chatApi } from '../../shared/Global/Chat/services/chatApi';
import { eventBus, EventTypes } from '../../services/EventBus';
import { useParams } from 'react-router-dom';
import { selectCurrentUserData } from '../../store/ducks/user/selectors';
import { useGetUserQuery } from '../../store/rtk/requests/user';

const Profile = () => {
  const { id } = useParams<{ id: string }>();

  const currentUser = useSelector(selectCurrentUserData);

  const userId = Number(id || currentUser?.id);
  const { data: user } = useGetUserQuery(userId, {
    skip: Number.isNaN(userId),
  });

  const courses = user?.specialist?.courses;
  const userClient = user?.roles.some(it => it.name === ROLE.USER);

  async function sendMessage() {
    if (!user) return;
    const dialog = await chatApi.create(user.id as number);
    eventBus.emit(EventTypes.chatOpen, dialog.id);
  }

  return (
    <div className={s.backgroundWrapper}>
      <div className={s.profile}>
        <div className={s.info}>
          {!!user && <Card user={user} />}
          {userClient ? (
            <Button
              isPrimary={true}
              className={s.actionBtn}
              onClick={sendMessage}
            >
              Начать чат
            </Button>
          ) : (
            ''
          )}
        </div>

        {courses && (
          <div className={s.courses}>
            <div className={s.title}>
              <h3>Курсы повышения квалификации</h3>
              {courses.length ? (
                <div className={s.postList}>
                  {courses.map((course, i) => (
                    <Post
                      key={i}
                      title={course.title}
                      description={course.description}
                      date={course.date}
                    />
                  ))}
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
