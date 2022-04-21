import React from 'react';
import s from './Welcome.module.scss';
import logoIcon from './../../../../assets/icons/global/logo.svg';

export const Welcome = () => {
  return (
    <div className={s.welcome}>
      <div className={s.content}>
        <div className={s.logo}>
          <img src={logoIcon} alt="BioTropika" />
        </div>
        <div className={s.title}>
          <p>Добро пожаловать в BioTropika</p>
        </div>
        <div className={s.subtitle}>
          <p>
            Ответь на наши вопросы для корректного формирования вашего рациона и
            тренировок
          </p>
        </div>
        <button className={s.startBtn}>Начать</button>
      </div>
    </div>
  );
};
