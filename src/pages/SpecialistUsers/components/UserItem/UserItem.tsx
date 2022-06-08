import React from 'react';

import s from './User.module.scss';
import { Link } from 'react-router-dom';
import { getFullName } from '../../../../utils/getFullName';
import { BaseUser } from '../../../../@types/entities/BaseUser';

interface Props {
  user: BaseUser;
}

export const UserItem = ({ user }: Props) => {
  return (
    <div className={s.user}>
      <div className={s.name}>
        <p>{getFullName(user.name, user.lastname, user.patronymic || '')}</p>
      </div>
      <Link to={`users/${user.id}`}>перейти в профиль</Link>
    </div>
  );
};
