import React from 'react';

import s from './Specialist.module.scss';
import { Link } from 'react-router-dom';
import { getFullName } from '../../../../utils/getFullName';
import { BaseUser } from '../../../../@types/entities/BaseUser';

interface Props {
  user: BaseUser;
}

export const SpecialistItem = ({ user }: Props) => {
  if (!user.specialist) {
    return null;
  }
  return (
    <div className={s.user}>
      <div className={s.name}>
        <p>{getFullName(user.name, user.lastname, user.patronymic || '')}</p>
      </div>
      <Link to={`specialists/${user.specialist?.id}`}>перейти в профиль</Link>
    </div>
  );
};
