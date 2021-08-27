import classNames from 'classnames';
import React from 'react';
import { GlobalSvgSelector } from '../../../assets/icons/global/GlobalSvgSelector';
import { Goal } from '../components/Goal/Goal';

import s from './Goals.module.scss';

interface Props {
  goals: any; //TODO:
  selectedPeriod: any; //TODO:
}

export const GraphHeader = ({ goals, selectedPeriod }: Props) => {
  return (
    <div className={s.graph__header}>
      <div className={s.goal__info}>
        <div className={s.goal__title}>{goals[1].title}</div>
        <div className={s.goal__description}>{goals[1].description}</div>
      </div>
      <div className={s.graph__period__selectors}>
        <div className={s.graph__period__selector}>Неделя</div>
        <div className={classNames(s.graph__period__selector, s.selected)}>
          Месяц
        </div>
        <div className={s.graph__period__selector}>Год</div>
        <button className={s.btn__calendar}>
          <div className={s.btn__calendar__date}>
            {selectedPeriod.from}
            {'  '}-{'  '}
            {selectedPeriod.to}
          </div>
          <GlobalSvgSelector id="calendar" />
        </button>
      </div>
    </div>
  );
};
