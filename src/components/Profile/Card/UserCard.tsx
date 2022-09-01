import React from 'react';
import { Link } from 'react-router-dom';
import { BaseUser } from '../../../@types/entities/BaseUser';
import { getMediaLink } from '../../../utils/mediaHelper';
import defaultAvatar from '../../../assets/images/profile/default_avatar.png';
import edit from '../../../assets/icons/profile/edit.svg';
import moment from 'moment';
import 'moment/locale/ru';

import s from './UserCard.module.scss';

moment.locale('ru');
interface Props {
  isPublic?: boolean;
  user: BaseUser;
  onEditClick: () => void;
}

export const ProfileCard = ({ user, isPublic, onEditClick }: Props) => {
  return (
    <div className={s.card}>
      <div className={s.avatar}>
        <img
          src={
            (user?.profilePhoto && getMediaLink(user.profilePhoto)) ||
            defaultAvatar
          }
        />
      </div>
      <div className={s.name}>
        <p>
          {user.lastname} {user.name}
        </p>
      </div>
      <div className={s.line}>
        <p>{user.email}</p>
      </div>
      <div className={s.line}>
        <p>{user.phone}</p>
      </div>
      <div className={s.line}>
        <p>{user?.dob && moment(new Date(user?.dob || '')).format('LL')}</p>
      </div>
      {!isPublic && (
        <p className={s.edit} onClick={onEditClick}>
          <div className={s.editIcon}>
            <img src={edit} alt="редактировать" />
          </div>
          <span>редактировать</span>
        </p>
      )}
    </div>
  );
};
