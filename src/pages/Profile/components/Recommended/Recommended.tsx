import { IInfoBar, InfoBar } from '../../../../shared/Global/InfoBar/InfoBar';
import PerfectScrollbar from 'react-perfect-scrollbar';
import s from './Recommended.module.scss';
import { RecommendedCard } from './RecommendedCard/RecommendedCard';
import { Recommendation } from './Recommendation/Recommendation';
import { useEffect, useState } from 'react';
import {
  Recommendation as IRecommendation,
  RecommendationType,
} from '../../../../store/ducks/recommendation/contracts/state';
import { SpecialistProfile } from './Recommendation/SpecialistProfile';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSortedData,
  SortedRecommendations,
} from '../../../../store/ducks/recommendations/selectors';
import { fetchRecommendationsData } from '../../../../store/ducks/recommendations/actionCreators';

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
    <div className={s.recommended}>
      <div className={s.recommended__cards}>
        {recTypes.map(type => (
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
      <div className={s.recommended__card__content}>
        {Object.keys(activeProfiles).map(id => (
          <div key={id}>
            <SpecialistProfile
              profile={activeProfiles[id][0].specialist_profile}
            />
            <PerfectScrollbar>
              <div className={s.recommendations__wrapper}>
                {activeProfiles[id].map((recommendation: IRecommendation) => (
                  <Recommendation
                    key={recommendation.id}
                    recommendation={recommendation}
                  />
                ))}
              </div>
            </PerfectScrollbar>
          </div>
        ))}
      </div>
    </div>
  );
};
