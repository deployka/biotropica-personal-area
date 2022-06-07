import React from 'react';

import s from './Profile.module.scss';

import Card from './components/Card/Card';
import { Post } from './components/Post/Post';
import Button from '../../components/Button/Button';
import { eventBus, EventTypes } from '../../services/EventBus';
import { useParams } from 'react-router-dom';
import { useCurrentUserQuery } from '../../api/user';
import { useGetOneSpecialistQuery } from '../../api/specialists';
import { ROLE } from '../../@types/entities/Role';
import { useCreateDialogMutation } from '../../api/chat';

const Profile = () => {
  const { id } = useParams<{ id: string }>();

  const { data: currentUser } = useCurrentUserQuery();
  const [createDialog] = useCreateDialogMutation();

  const userId = Number(id || currentUser?.id);
  const { data: user } = useGetOneSpecialistQuery(
    { id: userId },
    {
      skip: Number.isNaN(userId),
    },
  );

  const courses = user?.courses;
  const userClient = user?.roles.some(it => it === ROLE.CLIENT);

  async function sendMessage() {
    if (!user) return;
    const dialog = await createDialog({ userId }).unwrap();
    eventBus.emit(EventTypes.chatOpen, dialog.id);
  }

  return (
    <div className={s.backgroundWrapper}>
      <div className={s.profile}>
        <div className={s.info}>
          {user && <Card user={user} />}
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
