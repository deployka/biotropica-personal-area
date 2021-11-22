import React from "react";

import s from "../Question.module.scss";

export const MultiSelectQuestion = () => {
  return (
    <input
      className={s.question__input}
      type="text"
      placeholder="Введите ответ"
    />
  );
};
