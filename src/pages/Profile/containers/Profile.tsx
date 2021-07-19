import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../store/ducks/user/selectors';
import { Card } from '../components/Card/Card';

import s from './Profile.module.scss';

interface Props {}

export const Profile = (props: Props) => {
  const user = useSelector(selectUserData);

  return (
    <div className={s.profile}>
      <div className={s.profile__info}>{user && <Card user={user} />}</div>
    </div>
  );
};
