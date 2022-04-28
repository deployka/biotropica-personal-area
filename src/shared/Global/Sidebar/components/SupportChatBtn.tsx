import classNames from 'classnames';
import React from 'react';
import { SidebarSvgSelector } from '../../../../assets/icons/sidebar/SIdebarSvgSelector';
import { Nav } from '../../../../layouts/PrivateLayout';

import s from '../SidebarDesktop.module.scss';

type Props = {
  onClick: () => void;
  isActive: boolean;
};

export function SupportChatBtn({ onClick, isActive }: Props) {
  return (
    <div
      onClick={onClick}
      className={classNames(s.chat, { [s.active]: isActive })}
    >
      <SidebarSvgSelector id="support" />
      <div className={s.prompt}>
        <p>Чат поддержка</p>
      </div>
    </div>
  );
}
