import React from 'react';
import s from './Tariff.module.scss';
import checkbox from './../../../../assets/icons/tariffs/checkbox.svg';
import { Tariff as ITariff } from '../../../../store/rtk/types/tariff';

interface Props {
  tariff: ITariff;
  onSelect(): void;
}

export const Tariff = ({ tariff, onSelect }: Props) => {
  return (
    <div className={s.card}>
      <div className={s.top}>
        <div className={s.price}>
          <div className={s.text}>
            <p>{tariff.cost}₽</p>
          </div>
          <div className={s.subText}>
            <p>/месяц</p>
          </div>
        </div>
        <div className={s.title}>
          <h3>{tariff.title}</h3>
        </div>

        <ul className={s.list}>
          {tariff.includedFields.map((feature: string) => (
            <li key={feature} className={s.listEl}>
              <img src={checkbox} alt="" />
              <p>{feature}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={s.bottom}>
        <a onClick={onSelect} className={s.button}>
          <button>продлить тариф</button>
        </a>
      </div>
    </div>
  );
};
