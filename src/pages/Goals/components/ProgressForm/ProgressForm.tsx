import React from 'react';
import { GlobalSvgSelector } from '../../../../assets/icons/global/GlobalSvgSelector';
import { Calendar } from '../../../../shared/Global/Сalendar/Calendar';
import { ProgressBar } from '../ProgressBar/ProgressBar';

import s from './ProgressForm.module.scss';

interface Props {}

export const ProgressForm = (props: Props) => {
  const progressBarOptions = {
    width: 120,
    height: 120,
    circleWidth: 8,
    gradientStartColor: '#6F61D0',
    gradientStopColor: '#C77EDF',
    bgColor: '#F7F6FB',
    progressValue: 56,
  };
  const calendar = {
    month: 'Август',
    year: '1993',
  };
  return (
    <div className={s.progress__form}>
      <ProgressBar options={progressBarOptions} />
      {/* <Calendar options={calendar} /> */}
      <div className={s.edit__goal}>
        <GlobalSvgSelector id="edit" />
        <div className={s.edit__goal__text}>редактировать цель</div>
      </div>
      <div className={s.progress__form__title}>
        Сообщите нам о вашем прогрессе
      </div>
      <form className={s.form__wrapper}>
        <div className={s.form__input__title}>Введите веc</div>
        <input
          placeholder="кг"
          min="10"
          max="350"
          type="number"
          className={s.form__input}
        />
        <div className={s.form__input__title}>Введите дату</div>
        <input type="date" className={s.form__input} />
        <button className={s.form__submit__btn}>Отметить</button>
      </form>
    </div>
  );
};
