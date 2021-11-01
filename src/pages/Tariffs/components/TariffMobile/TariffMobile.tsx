import React, { useState } from "react";
import s from "./TariffMobile.module.scss";
import checkbox from "./../../../../assets/icons/tariffs/checkbox.svg";
import arrow from "./../../../../assets/icons/tariffs/arrow.svg";

import { Tariff as ITariff } from "../../containers/Tariffs";

interface Props {
  tariff: any;
}
interface Feature {
  tariff: ITariff;
}

export const TariffMobile = ({ tariff }: Props) => {
  const { price, name, features, prolongLink } = tariff;

  const [hidden, setHidden] = useState(true);

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
      {!hidden && (
        <ul className={s.list}>
          {features.map((feature: string) => (
            <li key={feature} className={s.listEl}>
              <img src={checkbox} alt="" />
              <p>{feature}</p>
            </li>
          ))}
        </ul>
      )}
      <div className={s.bottom}>
        <a href={prolongLink} className={s.button}>
          продлить тариф
        </a>
        <button
          className={s.hideBtn}
          onClick={() => {
            setHidden(!hidden);
          }}
        >
          {hidden ? "подробнее" : "скрыть"}
          <img
            style={hidden ? { transform: "rotate(180deg)", top: "3px" } : {}}
            src={arrow}
            alt=""
          />
        </button>
      </div>
    </div>
  );
};
