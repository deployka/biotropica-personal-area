import React from 'react';
import { Link } from 'react-router-dom';
import { CurrentTariff } from '../../../../@types/entities/Tariff';
import s from './Tariff.module.scss';
import { format } from 'date-fns';
interface Props {
  title?: string;
  expires?: string;
  isPaid?: boolean;
}

export const Tariff = ({ title, expires, isPaid }: Props) => {
  return (
    <div className={s.tariff}>
      <div className={s.title}>
        {title && 'Тип тарифа: '}
        <p>{title || 'У пользователя нет тарифа'}</p>
      </div>
      <div className={s.date}>
        {expires && (
          <p>
            До &nbsp;
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
          {isPaid ? 'Тариф оплачен' : <>{title && 'Тариф не оплачен'}</>}
        </p>
      </div>
    </div>
  );
};
