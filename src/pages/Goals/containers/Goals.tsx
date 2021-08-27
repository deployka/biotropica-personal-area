import classNames from 'classnames';

import React from 'react';
import { GlobalSvgSelector } from '../../../assets/icons/global/GlobalSvgSelector';
import { Goal } from '../components/Goal/Goal';
import { Graph } from '../components/Graph/Graph';
import { ProgressForm } from '../components/ProgressForm/ProgressForm';
import s from './Goals.module.scss';
import { GraphHeader } from './GraphHeader';
import { Header } from './Header';

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
      <Header goals={goals} />
      <div className={s.goal__content}>
        <div className={s.goal__content__graph}>
          <GraphHeader goals={goals} selectedPeriod={selectedPeriod} />
          <Graph />
        </div>
        <div className={s.goal__content__edit}>
          <ProgressForm />
        </div>
      </div>
    </div>
  );
};
