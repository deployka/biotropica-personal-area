import { format } from 'date-fns';
import React, { ReactNode } from 'react';
import s from './Tariff.module.scss';

type Props = {
  title?: string;
  expires?: string;
  isPaid?: boolean;
  onClickBuyTariff?: () => void;
  onClickPayTariff?: () => void;
};

export const ProfileTariff = ({
  title,
  expires,
  isPaid,
  onClickBuyTariff,
  onClickPayTariff,
}: Props) => {
  const formattedExpires = expires
    ? format(new Date(expires), 'dd.MM.yyyy, HH:mm') || '-'
    : '';

  return (
    <div style={{ textDecoration: 'none' }} className={s.tariff}>
      <div className={s.title}>
        <p>{title || 'У вас нет тарифа'}</p>
      </div>
      {formattedExpires && (
        <div className={s.date}>
          <p>До {formattedExpires}</p>
        </div>
      )}
      {!isPaid && (
        <div className={s.isPaid}>
          {!title && <p onClick={onClickBuyTariff}>Купить тариф</p>}
          {title && <p onClick={onClickPayTariff}>Отплатить тариф</p>}
        </div>
      )}
    </div>
  );
};
