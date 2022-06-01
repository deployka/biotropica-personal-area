import React, { useEffect, useState } from 'react';
import { IInfoBar, InfoBar } from '../../../../shared/Global/InfoBar/InfoBar';

import { RecommendationType } from '../../../../store/ducks/recommendation/contracts/state';

import {
  selectSortedRecommendationsData,
  SortedRecommendations,
} from '../../../../store/ducks/recommendations/selectors';

import 'react-perfect-scrollbar/dist/css/styles.css';

import s from './Recommended.module.scss';
import { MobileRecommended } from './MobileRecommended';
import { DesktopRecommended } from './DesktopRecommended';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecommendationsData } from '../../../../store/ducks/recommendations/actionCreators';

interface Props {
  user: User;
}

export const Recommended = ({ user }: Props) => {
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState<boolean>(false);

  const infoBar: IInfoBar = {
    title: 'У вас нет рекомендаций',
    text: 'Чтобы получить рекомендации, пройдите видеоконсультацию.',
    bottomLink: 'Записаться на видеоконсультацию',
    href: '/consultations',
  };

  const recommendations: SortedRecommendations = useSelector(
    selectSortedRecommendationsData,
  );
  const recTypes: RecommendationType[] = Object.keys(
    recommendations,
  ) as RecommendationType[];

  const [activeType, setActiveType] = useState<RecommendationType | null>(
    recTypes[0],
  );

  const activeProfiles =
    recommendations[activeType || RecommendationType.WORKOUT];

  useEffect(() => {
    dispatch(fetchRecommendationsData(user.id));
  }, []);

  useEffect(() => {
    if (document.documentElement.clientWidth <= 1200) {
      setMobile(true);
      setActiveType(null);
    }
  }, []);

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
      {mobile
        ? (
          <MobileRecommended
            recTypes={recTypes}
            activeType={activeType}
            setActiveType={setActiveType}
            optionsByType={optionsByType}
            getAmountByType={getAmountByType}
            getProfilesByType={getProfilesByType}
          />
          )
        : (
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
