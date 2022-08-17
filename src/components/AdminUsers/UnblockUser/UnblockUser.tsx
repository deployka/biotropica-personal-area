import React, { useState } from 'react';
import Button from '../../Button/Button';

import s from './UnblockUser.module.scss';

type Props = {
  onSubmit: () => void;
  onCancel: () => void;
};

export const UnlockUser = ({ onSubmit, onCancel }: Props) => {
  return (
    <div className={s.container}>
      <p>Разблокировать пользователя?</p>
      <div className={s.buttons}>
        <Button isPrimary onClick={onSubmit}>
          Разблокировать
        </Button>
        <Button onClick={onCancel}>Отменить</Button>
      </div>
    </div>
  );
};
