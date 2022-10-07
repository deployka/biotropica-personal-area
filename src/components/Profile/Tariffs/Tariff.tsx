import { format } from 'date-fns';
import React, { ReactNode } from 'react';
import s from './Tariff.module.scss';

type Props = {
  title?: string;
  expires?: string;
  isPaid?: boolean;
  isPublic?: boolean;
  onClickBuyTariff?: () => void;
};

export const ProfileTariff = ({
  title,
  expires,
  isPaid,
  isPublic = false,
  onClickBuyTariff,
}: Props) => {
  const formattedExpires = expires
    ? format(new Date(expires), 'dd.MM.yyyy, HH:mm') || '-'
    : '';

  const emptyTariff = isPublic
    ? 'У пользователя нет тарифа'
    : 'У вас нет тарифа';

  return (
    <div style={{ textDecoration: 'none' }} className={s.tariff}>
      <div className={s.title}>
        <p>{title || emptyTariff}</p>
      </div>
      {formattedExpires && (
        <div className={s.date}>
          <p>До {formattedExpires}</p>
        </div>
      )}
      {!isPaid && !isPublic && (
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
