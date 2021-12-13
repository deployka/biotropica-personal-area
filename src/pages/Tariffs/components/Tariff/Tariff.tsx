import React from 'react';
import s from './Tariff.module.scss';
import checkbox from './../../../../assets/icons/tariffs/checkbox.svg';

import { Tariff as ITariff } from '../../containers/Tariffs';

interface Props {
  tariff: any;
}
interface Feature {
  tariff: ITariff;
}

export const Tariff = ({ tariff }: Props) => {
  const { price, name, features, prolongLink } = tariff;
  return (
    <div className={s.card}>
      <div className={s.top}>
        <div className={s.price}>
          <div className={s.text}>
            <p>{price}₽</p>
          </div>
          <div className={s.subText}>
            <p>/месяц</p>
          </div>
        </div>
        <div className={s.title}>
          <h3>{name}</h3>
        </div>

        <ul className={s.list}>
          {features.map((feature: string) => (
            <li key={feature} className={s.listEl}>
              <img src={checkbox} alt="" />
              <p>{feature}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={s.bottom}>
        <a href={prolongLink} className={s.button}>
          <button>продлить тариф</button>
        </a>
      </div>
    </div>
  );
};
