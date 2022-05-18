import React from 'react';
import { SidebarSvgSelector } from '../../../../assets/icons/sidebar/SIdebarSvgSelector';

import s from '../SidebarDesktop.module.scss';

type Props = {
  onClick: () => void;
};

export function LogoutBtn({ onClick }: Props) {
  return (
    <button onClick={onClick} className={s.logout}>
      <SidebarSvgSelector id="logout" />
      <div className={s.prompt}>
        <p>Выйти</p>
      </div>
    </button>
  );
}
