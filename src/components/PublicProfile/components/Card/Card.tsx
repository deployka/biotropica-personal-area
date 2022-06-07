import React from 'react';

import defaultAvatar from '../../../../assets/images/profile/default_avatar.png';
import moment from 'moment';
import 'moment/locale/ru';
import classNames from 'classnames';
import { getMediaLink } from '../../../../utils/mediaHelper';
import { Client } from '../../../../@types/entities/Client';
moment.locale('ru');

import s from './Card.module.scss';
interface Props {
  user: Client;
}

export const Card = ({ user }: Props) => {
  const avatar = user?.profilePhoto && getMediaLink(user.profilePhoto);
  const dob = user?.dob && moment(new Date(user?.dob || '')).format('LL');
  return (
    <div className={s.profile__card}>
      <div className={classNames(s.profile__avatar__wrapper, s.paid)}>
        <img
          className={s.profile__avatar}
          src={avatar || defaultAvatar}
          alt="avatar"
        />
      </div>
      <div className={s.profile__name}>
        <p>
          {user.lastname} {user.name}
        </p>
      </div>
      <div className={s.profile__mail}>
        <p>{user.email}</p>
      </div>
      <div className={s.profile__phone}>
        <p>{user.phone}</p>
      </div>
      <div className={s.profile__birth}>
        <p>{dob}</p>
      </div>
    </div>
  );
};
