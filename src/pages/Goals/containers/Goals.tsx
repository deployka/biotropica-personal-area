import classNames from 'classnames';

import React from 'react';
import { GlobalSvgSelector } from '../../../assets/icons/global/GlobalSvgSelector';
import { Goal } from '../components/Goal/Goal';
import { ProgressForm } from '../components/ProgressForm/ProgressForm';
import s from './Goals.module.scss';
import PHPInvestor from '../../../assets/images/temp/YO0ly2_724c.jpg';

interface Props {}
export interface Goal {
  title: string;
  description: string;
  target: number;
  currentTarget: number;
}

export const Goals = (props: Props) => {
  const goals = [
    {
      title: 'Похудеть до 80кг',
      description: 'Хочу сдохнуть от худобы',
      target: 80,
      currentTarget: 900,
    },
    {
      title: 'Похудеть до 30кг',
      description: 'ура описание охуеть блять',
      target: 30,
      currentTarget: 100,
    },
    {
      title: 'Похудеть до 40кг',
      description: 'здрасте я кончил = ]',
      target: 40,
      currentTarget: 50,
    },
  ];
  const selectedPeriod = {
    from: '01.06.21',
    to: '31.06.21',
  };
  return (
    <div className={s.goals}>
      <div className={s.goals__header}>
        <div className={s.goals__container}>
          {goals.map((goal, index) => (
            <Goal key={index + goal.target} goal={goal} />
          ))}
        </div>
        <button className={s.btn__create__goal}>Создать новую цель</button>
      </div>
      <div className={s.goal__content}>
        <div className={s.goal__content__graph}>
          <div className={s.graph__header}>
            <div className={s.goal__info}>
              <div className={s.goal__title}>{goals[1].title}</div>
              <div className={s.goal__description}>{goals[1].description}</div>
            </div>
            <div className={s.graph__period__selectors}>
              <div className={s.graph__period__selector}>Неделя</div>
              <div
                className={classNames(s.graph__period__selector, s.selected)}
              >
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
          <img src={PHPInvestor} className={s.graph__placeholder} />
        </div>
        <div className={s.goal__content__edit}>
          <ProgressForm />
        </div>
      </div>
    </div>
  );
};
