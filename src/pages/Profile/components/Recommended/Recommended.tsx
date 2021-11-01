import PerfectScrollbar from 'react-perfect-scrollbar';

import s from './Recommended.module.scss';
import { Options, RecommendedCard } from './RecommendedCard/RecommendedCard';
import { Recommendation } from './Recommendation/Recommendation';
import { useEffect, useState } from 'react';
import {
  Recommendation as IRecommendation,
  RecommendationType,
  SpecialistProfile,
} from '../../../../store/ducks/recommendation/contracts/state';
import { Profile } from './Recommendation/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { selectRecommendationsData } from '../../../../store/ducks/recommendations/selectors';
import { fetchRecommendationsData } from '../../../../store/ducks/recommendations/actionCreators';

export const Recommended = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecommendationsData());
  }, []);

  const recommendations: IRecommendation[] = useSelector(
    selectRecommendationsData
  );

  const [activeType, setActiveType] = useState<RecommendationType>(
    RecommendationType.NUTRITION
  );

  function filterRecommendationsByType(
    recommendations: IRecommendation[],
    type: RecommendationType
  ) {
    return recommendations.filter(
      (recommendation: IRecommendation) => recommendation.type === type
    );
  }

  function getCardTypesFromRecommendations() {
    if (!recommendations.length) {
      return [];
    }
    const recommendationTypes = recommendations.reduce(
      (acc: RecommendationType[], recommendation: IRecommendation) => {
        if (!acc.includes(recommendation.type)) {
          acc.push(recommendation.type);
        }
        return acc;
      },
      [recommendations[0].type]
    );
    return recommendationTypes;
  }

  function getProfilesIdFromRecommendationsByType(type: RecommendationType) {
    if (!recommendations.length) {
      return [];
    }
    const profiles = filterRecommendationsByType(recommendations, type).reduce(
      (acc: number[], recommendation: IRecommendation) => {
        if (!acc.includes(recommendation.specialist_profile.id)) {
          acc.push(recommendation.specialist_profile.id);
        }
        return acc;
      },
      [recommendations[0].specialist_profile.id]
    );
    return profiles || [];
  }

  function getProfileById(id: number) {
    return recommendations.find(
      (recommendation: IRecommendation) =>
        recommendation.specialist_profile.id === id
    )?.specialist_profile;
  }

  function getOptionsByType(type: RecommendationType): Options {
    switch (type) {
      case RecommendationType.NUTRITION:
        return {
          name: 'Питание',
          color: 'yellow',
        };
      case RecommendationType.WORKOUT:
        return {
          name: 'Тренировки',
          color: 'green',
        };
      default:
        return {
          name: 'Неизвестно',
          color: 'black',
        };
    }
  }
  return (
    <div className={s.recommended}>
      <div className={s.recommended__cards}>
        {getCardTypesFromRecommendations()?.map(type => (
          <RecommendedCard
            setActiveType={setActiveType}
            activeType={activeType}
            key={type}
            type={type}
            options={getOptionsByType(type)}
            amount={filterRecommendationsByType(recommendations, type).length}
          />
        ))}
      </div>
      <div className={s.recommended__card__content}>
        {getProfilesIdFromRecommendationsByType(activeType).map(
          (id: number) => (
            <Profile key={id} profile={getProfileById(id) as SpecialistProfile}>
              <PerfectScrollbar>
                <div className={s.recommendations__wrapper}>
                  {recommendations
                    .filter(
                      it =>
                        it.type === activeType &&
                        it.specialist_profile.id === id
                    )
                    .map((recommendation: IRecommendation) => (
                      <Recommendation
                        key={recommendation.id}
                        recommendation={recommendation}
                      />
                    ))}
                </div>
              </PerfectScrollbar>
            </Profile>
          )
        )}
      </div>
    </div>
  );
};
