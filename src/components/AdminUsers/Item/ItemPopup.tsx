import React from 'react';

import s from './Item.module.scss';

export type PopUpProps = {
  onBlockClick: () => void;
  onWriteClick: () => void;
};

export function ItemPopup({ onBlockClick, onWriteClick }: PopUpProps) {
  return (
    <div className={s.popup}>
      <div className={s.element} onClick={onBlockClick}>
        <p>Заблокировать</p>
      </div>
      <div className={s.element} onClick={onWriteClick}>
        <p>Написать</p>
      </div>
    </div>
  );
}
