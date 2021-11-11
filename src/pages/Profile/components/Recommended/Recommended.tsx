import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { IInfoBar, InfoBar } from '../../../../shared/Global/InfoBar/InfoBar';
import { RecommendedCard } from './RecommendedCard/RecommendedCard';

import {
  Recommendation as IRecommendation,
  RecommendationType,
} from '../../../../store/ducks/recommendation/contracts/state';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectSortedData,
  SortedRecommendations,
} from '../../../../store/ducks/recommendations/selectors';
import { fetchRecommendationsData } from '../../../../store/ducks/recommendations/actionCreators';

import 'react-perfect-scrollbar/dist/css/styles.css';

import s from './Recommended.module.scss';
import { Recommendation } from './Recommendation/Recommendation';

export const Recommended = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecommendationsData());
  }, []);

  const infoBar: IInfoBar = {
    title: 'У вас нет рекомендаций',
    text: 'Чтобы получить рекомендации, пройдите видеоконсультацию.',
    bottomLink: 'Записаться на видеоконсультацию',
    href: '/video',
  };

  const recommendations: SortedRecommendations = useSelector(selectSortedData);
  const recTypes: RecommendationType[] = Object.keys(
    recommendations
  ) as RecommendationType[];

  const [activeType, setActiveType] = useState<RecommendationType>(recTypes[0]);

  const activeProfiles = recommendations[activeType];

  const optionsByType = {
    [RecommendationType.NUTRITION]: {
      name: 'Питание',
      color: 'yellow',
    },
    [RecommendationType.WORKOUT]: {
      name: 'Тренировки',
      color: 'green',
    },
  };

  function getAmountByType(type: RecommendationType): number {
    return Object.keys(recommendations[type]).reduce((acc, id) => {
      return (acc += recommendations[type][id].length);
    }, 0);
  }

  if (!Object.keys(recommendations).length) {
    return <InfoBar infoBar={infoBar} />;
  }

  return (
    <div className={s.recommendations}>
      <div className={s.cards}>
        {recTypes.map((type) => (
          <RecommendedCard
            setActiveType={setActiveType}
            activeType={activeType}
            key={type}
            type={type}
            options={optionsByType[type]}
            amount={getAmountByType(type)}
          />
        ))}
      </div>

      <PerfectScrollbar>
        <div className={s.content}>
          {Object.keys(activeProfiles).map((id, i) => (
            <Recommendation
              key={`${id}_${i}`}
              id={id}
              activeProfiles={activeProfiles}
            />
          ))}
        </div>
      </PerfectScrollbar>
    </div>
  );
};
