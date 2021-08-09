import React from 'react';
import s from './Tariff.module.scss';
import { Feature as IFeature } from '../containers/Tariffs';
import checkbox from '../../../assets/icons/tariffs/checkbox.svg';
interface Props {
  tariff: any;
}
interface Feature {
  feature: IFeature;
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
              {features.map((feature: Feature) => (
                <li className={s.rate__list__elem}>
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
