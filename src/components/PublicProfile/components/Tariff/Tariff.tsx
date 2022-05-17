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

export const Tariff = ({ tariff }: Props) => {
  return (
    <div className={s.tariff}>
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
    </div>
  );
};
