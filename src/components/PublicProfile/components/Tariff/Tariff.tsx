import React from 'react';
import { Link } from 'react-router-dom';
import { CurrentTariff } from '../../../../@types/entities/Tariff';
import s from './Tariff.module.scss';

interface Props {
  tariff: CurrentTariff;
}

export const Tariff = ({ tariff }: Props) => {
  return (
    <div className={s.tariff}>
      <div className={s.title}>
        <p>
          Тариф {'  '}
          {tariff.tariff.title}
        </p>
      </div>
      <div className={s.date}>
        <p>
          до {'  '}
          {tariff.expiredAt}
        </p>
      </div>
    </div>
  );
};
