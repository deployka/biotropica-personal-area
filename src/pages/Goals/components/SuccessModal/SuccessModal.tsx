import React from 'react';
import check from '../../../../assets/images/sucess-form/check.png';
import s from './SuccessModal.module.scss';

interface Props {}

export const SuccessModal = (props: Props) => {
  return (
    <div className={s.sucess__modal}>
      <div className={s.sucess__modal__wrapper}>
        <img src={check} className={s.sucess__modal__img} />
        <div className={s.sucess__modal__title}>Ваша цель успешно создана!</div>
        <div className={s.sucess__modal__subtitle}>
          Не забывайте регулярно отмечать свой прогресс в достижении цели
        </div>
        <button className={s.sucess__modal__close__btn}>Закрыть</button>
      </div>
    </div>
  );
};
