import React from "react";

import s from "./Specialist.module.scss";

export interface SpecialistInfo {
  photoLink: string;
  name: string;
  expierence: string;
  specialiaztion: string;
  price: number;
}

interface Props {
  specialist: SpecialistInfo;
}

export const Specialist = ({ specialist }: Props) => {
  return (
    <div className={s.specialist}>
      <div className={s.info}>
        <div className={s.photo}>
          <img src={`${specialist.photoLink}`} alt="" />
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
