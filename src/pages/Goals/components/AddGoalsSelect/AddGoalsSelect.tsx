import React from 'react';
import { Button } from '../../../../shared/Form/Button/Button';
import { SuccessModal } from '../SuccessModal/SuccessModal';

import s from './AddGoalsSelect.module.scss';

interface Props {}

export const AddGoalsSelect = (props: Props) => {
  return (
    <div className={s.add__goals__select}>
      <div className={s.add__goals__select__wrapper}>
        <h2 className={s.add__goals__select__title}>Изменение веса</h2>
        <div className={s.selector}>
          <div className={s.selector__content}>
            <div className={s.selector__title}>Изменение веса</div>
            <div className={s.selector__description}>
              Сбросить вес или набрать вес
            </div>
          </div>
        </div>
        <div className={s.selector}>
          <div className={s.selector__content}>
            <div className={s.selector__title}>Бег</div>
            <div className={s.selector__description}>
              Пробежать определённую дистанцию
            </div>
          </div>
        </div>
        <div className={s.selector}>
          <div className={s.selector__content}>
            <div className={s.selector__title}>Силовые показатели</div>
            <div className={s.selector__description}>
              Поднимать опредёленные веса
            </div>
          </div>
        </div>
        <div className={s.select__buttons}>
          <div className={s.btn__discard}>Отмена</div>
          <div className={s.btn__next}>Далее</div>
        </div>
      </div>
    </div>
  );
};
