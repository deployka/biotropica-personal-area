import React from "react";
import { ConsultationsSvgSelector } from "../../../assets/icons/consultations/ConsultationsSvgSelector";
import { Specialist } from "../components/Specialist";

import s from "./Consultations.module.scss";

import { Person } from "./../components/Specialist";

interface Props {}

export const Consultations = (props: Props) => {
  const specialists: Person[] = [
    {
      name: "Иван Самарин",
      expierence: "3 года",
      specialiaztion: "Проктолог",
      price: 1500,
    },
    {
      name: "Барулин Михаил Алексеевич",
      expierence: "10 лет",
      specialiaztion: "Диетолог",
      price: 15000,
    },
  ];
  return (
    <div className={s.consultations}>
      <form className={s.search}>
        <label className={s.searchLabel} htmlFor="searchInput-1">
          <ConsultationsSvgSelector id="search" />
        </label>
        <input
          className={s.searchInput}
          type="text"
          name=""
          id="searchInput-1"
          placeholder="Введите имя специалиста"
        />
        <button className={s.button} type="button">
          Найти
        </button>
      </form>
      <div className={s.consultationsList}>
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
            <Specialist specialist={specialist} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
