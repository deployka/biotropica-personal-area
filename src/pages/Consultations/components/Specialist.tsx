import React from "react";

import s from "./Specialist.module.scss";

export interface Person {
  name: string;
  expierence: string;
  specialiaztion: string;
  price: number;
}

interface Props {
  specialist: Person;
}

export const Specialist = ({ specialist }: Props) => {
  return (
    <div className={s.specialist}>
      <div className={s.info}>
        <div className={s.photo}>
          <img
            src="https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
            alt=""
          />
        </div>
        <div className={s.container}>
          <div className={s.name}>
            <p>{specialist.name}</p>
          </div>
          <div className={s.expierence}>
            <p>стаж {specialist.expierence}</p>
          </div>
        </div>
      </div>

      <div className={s.specialiaztion}>
        <p>{specialist.specialiaztion}</p>
      </div>
      <div className={s.price}>
        <p>{specialist.price} ₽</p>
      </div>
      <div className={s.appointment}>
        <button>Записаться</button>
      </div>
    </div>
  );
};
