import React, { useState } from 'react';
import s from './TariffMobile.module.scss';
import checkbox from './../../../../assets/icons/tariffs/checkbox.svg';
import arrow from './../../../../assets/icons/tariffs/arrow.svg';

import AnimateHeight from 'react-animate-height';
import { Tariff } from '../../../../@types/entities/Tariff';

interface Props {
  tariff: Tariff;
  onSelect(): void;
}

export const TariffMobile = ({ tariff, onSelect }: Props) => {
  const [height, setHeight] = useState<number | string>(0);

  function toggle() {
    height === 0 ? setHeight('auto') : setHeight(0);
  }

  return (
    <div className={s.card}>
      <div className={s.title}>
        <h3>{tariff.title}</h3>
      </div>
      <div className={s.price}>
        <div className={s.text}>
          <p>{tariff.cost}₽</p>
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
          {tariff.includedFields.map((feature: string) => (
            <li key={feature} className={s.listEl}>
              <img src={checkbox} alt="" />
              <p>{feature}</p>
            </li>
          ))}
        </ul>
      </AnimateHeight>

      <div className={s.bottom}>
        <a onClick={onSelect} className={s.button}>
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
