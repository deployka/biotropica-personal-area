import React, { useState } from 'react';

import { Recommendation as IRecommendation } from '../../../../../store/ducks/recommendation/contracts/state';
import moment from 'moment';

import s from './Recommendation.module.scss';

import 'react-perfect-scrollbar/dist/css/styles.css';

interface Props {
  recommendation: IRecommendation;
}

export const Content = ({ recommendation }: Props) => {
  const [hidden, setHidden] = useState(true);

  const createdAt = moment(recommendation.createdAt, 'YYYYMMDD');
  return (
    <div className={s.recommendationPost}>
      <div className={s.content} style={hidden ? { height: '20px' } : {}}>
        <h2 className={s.title}>{recommendation.title}</h2>
        <p className={s.content}>
          {recommendation.description || 'Нет описания'}
        </p>
      </div>
      <div className={s.infoBar}>
        <div className={s.date}>
          <p>Создано: {createdAt.format('Do MMMM YYYY г.')}</p>
        </div>
        <div
          className={s.hiddenButton}
          onClick={() => {
            setHidden(!hidden);
          }}
        >
          <p>{hidden ? 'показать' : 'скрыть'}</p>
        </div>
      </div>
    </div>
  );
};
