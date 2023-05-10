import React from 'react';

import s from './Item.module.scss';
import { SubscribeStatus } from '../../../@types/dto/subscribers/update-subscriber.dto';
import { BaseUser } from '../../../@types/entities/BaseUser';

type Props = {
  fullName: string;
  id: number;
  status: SubscribeStatus;
  initiatorId: number;
  user: BaseUser;
  handleUserClick: () => void;
  handleRejectClick: (id:number) => void;
  handleApplyClick: (id:number) => void;
};

export const SubscribersListTabItem = (
  {
    fullName,
    handleUserClick,
    id,
    handleRejectClick,
    handleApplyClick,
    initiatorId,
    user,
  }: Props) => {
  return (
    <div className={s.item}>
      <span className={s.name} onClick={handleUserClick}>
        {fullName}
      </span>
      <div>
         {initiatorId === user.id && <button className={[s.btn, s.apply].join(' ')} onClick={() => handleApplyClick(id)}>Подтвердить</button>}
          <button className={[s.btn, s.reject].join(' ')} onClick={() => handleRejectClick(id)}>Отказать</button>
      </div>
    </div>
  );
};
