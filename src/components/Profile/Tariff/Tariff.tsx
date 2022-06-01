import React from 'react';
import { Link } from 'react-router-dom';
import s from './Tariff.module.scss';

interface Tariff {
  name: string;
  expires: string;
}
interface Props {
  tariff: Tariff; // TODO: Добавить интерфейс после добавления тарифов в редакс
}

export const ProfileTariff = ({ tariff }: Props) => {
  return (
    <Link style={{ textDecoration: 'none' }} className={s.tariff} to="/tariffs">
      <div className={s.title}>
        <p>
          Тариф {'  '}
          {tariff.name}
        </p>
      </div>
      <div className={s.date}>
        <p>
          до {'  '}
          {tariff.expires}
        </p>
      </div>
    </Link>
  );
};
