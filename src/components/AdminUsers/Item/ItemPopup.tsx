import React from 'react';

import s from './Item.module.scss';

export type PopUpProps = {
  isBanned: boolean;
  onProfileClick: () => void;
  onToggleUserBanStatus: () => void;
  onWriteClick: () => void;
};

export function ItemPopup({
  isBanned,
  onProfileClick,
  onToggleUserBanStatus,
  onWriteClick,
}: PopUpProps) {
  return (
    <div className={s.popup}>
      <div className={s.element} onClick={onProfileClick}>
        <p>Профиль</p>
      </div>
      <div className={s.element} onClick={onWriteClick}>
        <p>Написать</p>
      </div>
      <div className={s.element} onClick={onToggleUserBanStatus}>
        <p>{isBanned ? 'Разблокировать' : 'Заблокировать'}</p>
      </div>
    </div>
  );
}
