import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { GlobalSvgSelector } from '../../../assets/icons/global/GlobalSvgSelector';
import { Goal } from '../../../store/ducks/goal/contracts/state';
import { selectGoalData } from '../../../store/ducks/goal/selectors';

import s from './Goals.module.scss';

interface Props {
  // goal: Goal;
  selectedPeriod: any; //TODO:
}

export const GraphHeader = ({ selectedPeriod }: Props) => {
  const goal: Goal | undefined = useSelector(selectGoalData);

  return (
    <>
      {goal && (
        <div className={s.graph__header}>
          <div className={s.goal__info}>
            <div className={s.goal__title}>{goal.name}</div>
            <div className={s.goal__description}>
              {goal.description || <br />}
            </div>
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
      )}
    </>
  );
};
