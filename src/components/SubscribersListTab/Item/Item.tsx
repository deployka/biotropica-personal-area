import React, { useEffect, useState, useCallback } from 'react';

import s from './Item.module.scss';
import { SubscribeStatus } from '../../../@types/dto/subscribers/update-subscriber.dto';
import { useUpdateSubscribByIdMutation } from '../../../api/subscribers';

type Props = {
  fullName: string;
  id: number;
  status: SubscribeStatus;
  handleUserClick: () => void;
  bntClickHandler: (id: number) => void;
};

export const SubscribersListTabItem = (
  {
    fullName,
    handleUserClick,
    id,
    bntClickHandler,
  }: Props) => {
  const [updateSubscribes] = useUpdateSubscribByIdMutation();

  const handleRejectClick = useCallback(async () => {
    await updateSubscribes({ id, status: SubscribeStatus.REJECTED });
    bntClickHandler(id);
  }, [bntClickHandler, id, updateSubscribes]);

  const handleApplyClick = useCallback(async () => {
    await updateSubscribes({ id, status: SubscribeStatus.SUBSCRIBE });
    bntClickHandler(id);
  }, [bntClickHandler, id, updateSubscribes]);

  return (
    <div className={s.item}>
      <span className={s.name} onClick={handleUserClick}>
        {fullName}
      </span>
      <div>
          <button className={[s.btn, s.apply].join(' ')} onClick={handleApplyClick}>Подтвердить</button>
          <button className={[s.btn, s.reject].join(' ')} onClick={handleRejectClick}>Отказать</button>
      </div>
    </div>
  );
};
