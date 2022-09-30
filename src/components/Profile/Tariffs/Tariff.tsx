import { format } from 'date-fns';
import React, { ReactNode } from 'react';
import s from './Tariff.module.scss';

type Props = {
  title?: string;
  expires?: string;
  isPaid?: boolean;
  onClickBuyTariff?: () => void;
};

export const ProfileTariff = ({
  title,
  expires,
  isPaid,
  onClickBuyTariff,
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
          {
            <p onClick={onClickBuyTariff}>
              {title ? 'Оплатить тариф' : ' Купить тариф'}
            </p>
          }
        </div>
      )}
    </div>
  );
};
