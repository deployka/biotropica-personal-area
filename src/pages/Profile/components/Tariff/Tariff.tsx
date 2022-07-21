import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import s from './Tariff.module.scss';

import { format } from 'date-fns';

type Props = {
  title?: string;
  expires?: string;
  isPaid?: boolean;
  PaymentBtn: ReactNode;
};

export const Tariff = ({ expires, title, isPaid, PaymentBtn }: Props) => {
  console.log(isPaid);

  return (
    <div style={{ textDecoration: 'none' }} className={s.tariff}>
      <div className={s.title}>
        <span>{title && 'Тип тарифа: '}</span>
        <p>{title || 'У вас нет тарифа'}</p>
      </div>
      <div className={s.date}>
        {expires && (
          <p>
            До {'  '}
            {format(new Date(expires), 'dd.MM.yyyy, HH:mm') || '-'}
          </p>
        )}
      </div>
      <div className={s.isPaid}>
        <p
          style={{
            color: !isPaid && title ? 'tomato' : isPaid ? '#61D07F' : '#9e97be',
          }}
        >
          {isPaid ? 'Тариф оплачен' : PaymentBtn}
        </p>
      </div>
    </div>
  );
};
