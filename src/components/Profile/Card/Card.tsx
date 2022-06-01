import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../../store/ducks/user/contracts/state';
import defaultAvatar from './../../../assets/images/profile/default_avatar.png';
import edit from './../../../assets/icons/profile/edit.svg';
import moment from 'moment';
import 'moment/locale/ru';
import classNames from 'classnames';
import { getMediaLink } from '../../../utils/mediaHelper';

import s from './Card.module.scss';

moment.locale('ru');

interface Props {
  user: User;
}

export const ProfileCard = ({ user }: Props) => {
  return (
    <div className={s.card}>
      <div className={classNames(s.avatarWrapper, s.paid)}>
        <img
          className={s.avatar}
          src={
            (user.profilePhoto && getMediaLink(user.profilePhoto)) ||
            defaultAvatar
          }
        />
      </div>
      <div className={s.name}>
        <p>
          {user.lastname} {user.name}
        </p>
      </div>
      <div className={s.mail}>
        <p>{user.email}</p>
      </div>
      <div className={s.phone}>
        <p>{user.phone}</p>
      </div>
      <div className={s.birth}>
        <p>{user.dob && moment(new Date(user?.dob || '')).format('LL')}</p>
      </div>
      <Link to="/profile/edit" className={s.edit}>
        <div className={s.editIcon}>
          <img src={edit} alt="редактировать" />
        </div>
        <span>редактировать</span>
      </Link>
    </div>
  );
};
