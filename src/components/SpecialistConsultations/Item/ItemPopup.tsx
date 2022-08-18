import React, { useState } from 'react';

import s from './Item.module.scss';

export type PopUpProps = {
  isPast?: boolean;
  isMovable?: boolean;
  onMove: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

export function ItemPopup({
  isPast,
  isMovable,
  onMove,
  onEdit,
  onDelete,
}: PopUpProps) {
  return (
    <div className={s.popup}>
      {!isPast && isMovable && (
        <div className={s.element} onClick={onMove}>
          <p>Перейти</p>
        </div>
      )}
      {!isPast && (
        <div className={s.element} onClick={onEdit}>
          <p>Изменить дату и время</p>
        </div>
      )}
      <div className={s.element} onClick={onDelete}>
        <p>Удалить консультацию</p>
      </div>
    </div>
  );
}
