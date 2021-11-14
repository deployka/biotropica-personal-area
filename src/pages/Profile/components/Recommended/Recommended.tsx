import React, { useEffect, useState } from 'react';
import { IInfoBar, InfoBar } from '../../../../shared/Global/InfoBar/InfoBar';

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
import { MobileRecommended } from './MobileRecomended';
import { DesktopRecommended } from './DesktopRecomended';

export const Recommended = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecommendationsData());
  }, []);

  const [mobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    if (document.documentElement.clientWidth <= 500) {
      setMobile(true);
      setActiveType(null);
    }
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

  const [activeType, setActiveType] = useState<RecommendationType | null>(
    recTypes[0]
  );

  const activeProfiles =
    recommendations[activeType || RecommendationType.WORKOUT];

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

  function getProfilesByType(type: RecommendationType) {
    return recommendations[type];
  }

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
      {mobile ? (
        <MobileRecommended
          recTypes={recTypes}
          activeType={activeType}
          setActiveType={setActiveType}
          optionsByType={optionsByType}
          getAmountByType={getAmountByType}
          getProfilesByType={getProfilesByType}
        />
      ) : (
        <DesktopRecommended
          recTypes={recTypes}
          activeType={activeType}
          setActiveType={setActiveType}
          optionsByType={optionsByType}
          getAmountByType={getAmountByType}
          activeProfiles={activeProfiles}
        />
      )}
    </div>
  );
};
