import React from 'react';

import { BtnBack } from '../../../../buttons/BtnBack/BtnBack';

import defaultAvatar from '../../../../../assets/images/profile/default_avatar.png';
import { getMediaLink } from '../../../../../utils/mediaHelper';

import s from './ChatHeader.module.scss';
interface Props {
  user: ChatUser;
  onClose: () => void;
}

export function ChatHeader({ user, onClose }: Props) {
  return (
    <div className={s.header}>
      <div className={s.backBtn} onClick={onClose}>
        <BtnBack />
      </div>
      <div className={s.profile}>
        <div className={s.avatar}>
          <img
            src={
              (user.profile_photo && getMediaLink(user.profile_photo)) ||
              defaultAvatar
            }
          />
        </div>
        <div className={s.info}>
          <div className={s.name}>
            <p>{user.name + ' ' + user.lastname}</p>
          </div>
          <div className={s.post}>
            <p>Фитнес инструктор</p>
          </div>
        </div>
      </div>
    </div>
  );
}
