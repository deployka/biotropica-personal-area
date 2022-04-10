import React from 'react';
import { useSelector } from 'react-redux';

import s from './Profile.module.scss';

import { RootState } from '../../store/store';
import Card from './components/Card/Card';
import { Post } from './components/Post/Post';
import { ROLE } from '../../store/rtk/types/user';
import Button from '../../components/Button/Button';
import { chatApi } from '../../shared/Global/Chat/services/chatApi';
import { eventBus, EventTypes } from '../../services/EventBus';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams<{ id: string }>();

  const userId = Number(id);

  const users = useSelector((state: RootState) => state.users.list);

  const user = users.find(user => user.id === userId);
  const courses = user?.specialist?.courses;
  const userClient = user?.roles.some(it => it.name === ROLE.USER);

  async function sendMessage() {
    if (!user) {
      return;
    }
    const dialog = await chatApi.create(user.id as number);
    eventBus.emit(EventTypes.chatOpen, dialog.id);
  }

  console.log('!');

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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
