import React from 'react';

import s from './Item.module.scss';
import { BaseUser } from '../../../@types/entities/BaseUser';

type Props = {
  fullName: string;
  initiatorId: number;
  user: BaseUser;
  handleUserClick: () => void;
  handleRejectClick: () => void;
  handleApplyClick: () => void;
  handleRemoveClick: () => void;
};

export const SubscribersListTabItem = (
  {
    fullName,
    handleUserClick,
    handleRejectClick,
    handleApplyClick,
    handleRemoveClick,
    initiatorId,
    user,
  }: Props) => {
  return (
    <div className={s.item}>
      <span className={s.name} onClick={handleUserClick}>
        {fullName}
      </span>
      <div>
         {initiatorId === user.id &&
         <>
          <button className={[s.btn, s.apply].join(' ')} onClick={handleApplyClick}>Подтвердить</button>
          <button className={[s.btn, s.reject].join(' ')} onClick={handleRejectClick}>Отказать</button>
         </>
         }
          {initiatorId !== user.id && <button className={[s.btn, s.reject].join(' ')} onClick={handleRemoveClick}>Отменить</button>}
      </div>
    </div>
  );
};
