import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import s from '../SidebarDesktop.module.scss';
import { getMediaLink } from '../../../../utils/mediaHelper';

import defaultAvatar from '../../../../assets/images/profile/default_avatar.png';

type Props = {
  isActive: boolean;
  onClick: () => void;
  avatar: string;
};

export function Avatar({ isActive, onClick, avatar }: Props) {
  return (
    <Link
      to="/profile"
      className={classNames(s.avatar, {
        [s.active]: isActive,
      })}
      onClick={onClick}
    >
      <div
        className={s.img}
        style={{
          backgroundImage: `url(${getMediaLink(avatar) || defaultAvatar})`,
        }}
      ></div>
    </Link>
  );
}
