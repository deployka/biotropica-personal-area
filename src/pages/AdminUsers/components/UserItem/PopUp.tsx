import s from './User.module.scss';
import React from 'react';

export type PopUpProps = {
    onBlockClick: () => void;
    onWriteClick: () => void;
}

export function PopUp({ onBlockClick, onWriteClick }: PopUpProps) {
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
