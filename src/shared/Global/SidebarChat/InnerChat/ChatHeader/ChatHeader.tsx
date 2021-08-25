import React from 'react';
import s from '../InnerChat.module.scss';
import { BtnBack } from '../../../../buttons/BtnBack/BtnBack';
import { User } from '../../../../../store/ducks/user/contracts/state';

import defaultAvatar from '../../../../../assets/images/profile/default_avatar.png';
interface Props {
  user: User;
  onClose: () => void;
}

export function ChatHeader({ user, onClose }: Props) {
  return (
    <div className={s.chat__header}>
      <div className={s.btn__back} onClick={onClose}>
        <BtnBack />
      </div>
      <div className={s.chat__header__profile}>
        <div className={s.profile__avatar__wrapper}>
          <img
            src={
              (user.profile_photo &&
                process.env.REACT_APP_BACKEND_URL + '/' + user.profile_photo) ||
              defaultAvatar
            }
            className={s.profile__avatar}
          />
        </div>
        <div className={s.profile__info}>
          <div className={s.profile__name}>{user.email}</div>
          <div className={s.profile__post}>Фитнес инструктор</div>
        </div>
      </div>
    </div>
  );
}
