import React from 'react';

import s from './AddGoalsForm.module.scss';

interface Props {}

export const AddGoalsForm = (props: Props) => {
  return (
    <div className={s.add__goals__form}>
      <div className={s.add__goals__form__wrapper}>
        <h2 className={s.form__title}>
          Введите заголовок, описание <br /> и параметры цели, а также ваш
          нынешний результат
        </h2>
      </div>
    </div>
  );
};
