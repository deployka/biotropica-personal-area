import React from "react";

import s from "./SpecialistsList.module.scss";

import { Specialist, SpecialistInfo } from "./Specialist";

interface Props {
  specialists: SpecialistInfo[];
}

export const SpecialistsList = ({ specialists }: Props) => {
  return (
    <div className={s.specialistList}>
      <div className={s.title}>
        <div className={s.titleName}>
          <p>ФИО специалиста</p>
        </div>
        <div className={s.titleSpecialization}>
          <p>Специализация</p>
        </div>
        <div className={s.titlePrice}>
          <p>Стоимость</p>
        </div>
        <div className={s.titleAppointment}>
          <p>Запись</p>
        </div>
      </div>
      <div className={s.list}>
        {specialists.map((specialist, i) => (
          <Specialist specialist={specialist} />
        ))}
      </div>
    </div>
  );
};
