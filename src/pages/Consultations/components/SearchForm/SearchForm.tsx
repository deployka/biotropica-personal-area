import React from "react";
import { ConsultationsSvgSelector } from "../../../../assets/icons/consultations/ConsultationsSvgSelector";

import s from "./SearchForm.module.scss";

interface Props {}

export const SearchForm = (props: Props) => {
  return (
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
  );
};
