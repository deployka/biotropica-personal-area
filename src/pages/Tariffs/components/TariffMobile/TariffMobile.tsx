import React, { useState } from 'react';
import s from './TariffMobile.module.scss';
import checkbox from './../../../../assets/icons/tariffs/checkbox.svg';
import arrow from './../../../../assets/icons/tariffs/arrow.svg';

import { Tariff as ITariff } from '../../containers/Tariffs';
import AnimateHeight from 'react-animate-height';

interface Props {
  tariff: any;
}
interface Feature {
  tariff: ITariff;
}

export const TariffMobile = ({ tariff }: Props) => {
  const { price, name, features, prolongLink } = tariff;

  const [height, setHeight] = useState<number | string>(0);

  function toggle() {
    height === 0 ? setHeight('auto') : setHeight(0);
  }

  return (
    <div className={s.card}>
      <div className={s.title}>
        <h3>{name}</h3>
      </div>
      <div className={s.price}>
        <div className={s.text}>
          <p>{price}₽</p>
        </div>
        <div className={s.subText}>
          <p>/месяц</p>
        </div>
      </div>

      <AnimateHeight
        duration={300}
        height={height} // see props documentation below
      >
        <ul className={s.list}>
          {features.map((feature: string) => (
            <li key={feature} className={s.listEl}>
              <img src={checkbox} alt="" />
              <p>{feature}</p>
            </li>
          ))}
        </ul>
      </AnimateHeight>

      <div className={s.bottom}>
        <a href={prolongLink} className={s.button}>
          продлить тариф
        </a>
        <button
          className={s.hideBtn}
          onClick={() => {
            toggle();
          }}
        >
          {!height ? 'подробнее' : 'скрыть'}
          <img
            style={!height ? { transform: 'rotate(0)', top: '-1px' } : {}}
            src={arrow}
            alt=""
          />
        </button>
      </div>
    </div>
  );
};
