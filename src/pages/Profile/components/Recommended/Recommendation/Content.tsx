import React, { useState } from 'react';

import { Recommendation as IRecommendation } from '../../../../../store/ducks/recommendation/contracts/state';
import moment from 'moment';

import s from './Recommendation.module.scss';

import 'react-perfect-scrollbar/dist/css/styles.css';
import AnimateHeight from 'react-animate-height';

interface Props {
  recommendation: IRecommendation;
}

export const Content = ({ recommendation }: Props) => {
  const [height, setHeight] = useState<number | string>(0);

  function toggle() {
    setHeight(height === 0
      ? 'auto'
      : 0);
  }

  const createdAt = moment(recommendation.createdAt, 'YYYYMMDD');
  return (
    <div className={s.recommendationPost}>
      <div className={s.content}>
        <h2 className={s.title}>{recommendation.title}</h2>
        <AnimateHeight height={height}>
          <p className={s.content}>
            {recommendation.description || 'Нет описания'}
          </p>
        </AnimateHeight>
      </div>

      <div className={s.infoBar}>
        <div className={s.date}>
          <p>Создано: {createdAt.format('Do MMMM YYYY г.')}</p>
        </div>
        <div
          className={s.hiddenButton}
          onClick={() => {
            toggle();
          }}
        >
          <p>{!height
            ? 'показать'
            : 'скрыть'}</p>
        </div>
      </div>
    </div>
  );
};
