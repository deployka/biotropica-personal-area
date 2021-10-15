import React from 'react';
import s from './Tariff.module.scss';
import checkbox from '../../../assets/icons/tariffs/checkbox.svg';
import { Tariff as ITariff } from '../containers/Tariffs';
interface Props {
  tariff: any;
}
interface Feature {
  tariff: ITariff;
}

export const Tariff = ({ tariff }: Props) => {
  const { price, name, features, prolongLink } = tariff;
  return (
    <div>
      <div className={s.rate}>
        <div className={s.rate__card}>
          <div className={s.rate__top}>
            <div className={s.rate__price}>
              <div className={s.rate__prise__text}>
                <p>{price}₽</p>
              </div>
              <div className={s.rate__prise__sub}>
                <p>/месяц</p>
              </div>
            </div>
            <div className={s.rate__headline}>
              <h3>{name}</h3>
            </div>
            <ul className={s.rate__list}>
              {features.map((feature: string) => (
                <li key={feature} className={s.rate__list__elem}>
                  <img src={checkbox} alt="" />
                  <p>{feature}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.rate__bottom}>
            <a href={prolongLink} className={s.rate__btn}>
              <button>продлить тариф</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
