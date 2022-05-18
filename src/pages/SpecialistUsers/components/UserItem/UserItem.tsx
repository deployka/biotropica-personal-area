import React, { useState } from 'react';

import s from './User.module.scss';
import { ROLE, User } from '../../../../store/rtk/types/user';
import { Link } from 'react-router-dom';
import { getFullName } from '../../../../utils/getFullName';

interface Props {
  user: User;
}

export const ROLE_TRANSLATIONS = {
  [ROLE.USER]: 'Пользователь',
  [ROLE.ADMIN]: 'Администратор',
  [ROLE.SPECIALIST]: 'Специалист',
};

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
