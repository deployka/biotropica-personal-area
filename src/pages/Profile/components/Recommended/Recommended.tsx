import { User } from '../../../../store/ducks/user/contracts/state';

import testAvatar from '../../../../assets/images/test-avatars/avatar-3.jpg';
import testAvatar2 from '../../../../assets/images/test-avatars/avatar-2.jpg';

import PerfectScrollbar from 'react-perfect-scrollbar';

import s from './Recommended.module.scss';
import { RecommendedCard } from './RecommendedCard/RecommendedCard';
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

interface Props {}

export const Recommended = ({}: Props) => {
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

  function filterRecommendationsByTypeAndSpecialistId(
    type: RecommendationType,
    specialistId: number,
    recommendations: IRecommendation[]
  ) {
    return filterRecommendationsBySpecialistId(
      filterRecommendationsByType(recommendations, type),
      specialistId
    );
  }
  function filterRecommendationsByType(
    recommendations: IRecommendation[],
    type: RecommendationType
  ) {
    return recommendations.filter(
      (recommendation: IRecommendation) => recommendation.type === type
    );
  }

  function filterRecommendationsBySpecialistId(
    recommendations: IRecommendation[],
    id: number
  ) {
    return recommendations.filter(
      (recommendation: IRecommendation) =>
        recommendation.specialist_profile.id === id
    );
  }

  function getCardTypesFromRecommendations() {
    const recommendationTypes = recommendations.map(
      (recommendation: IRecommendation) => recommendation.type
    );
    return Array.from(new Set(recommendationTypes));
  }

  function getProfilesIdFromRecommendationsByType(type: RecommendationType) {
    const profiles = filterRecommendationsByType(recommendations, type).map(
      (recommendation: IRecommendation) => recommendation.specialist_profile.id
    );
    return Array.from(new Set(profiles));
  }

  function getProfileById(id: number) {
    return recommendations.reduce(
      (
        acc: SpecialistProfile | null,
        recommendation: IRecommendation,
        i: number
      ) => {
        if ((acc && acc.id !== id) || i === 0) {
          acc = recommendation.specialist_profile;
        }
        return acc;
      },
      null
    );
  }

  return (
    <div className={s.recommended}>
      <div className={s.recommended__cards}>
        {getCardTypesFromRecommendations().map(type => (
          <RecommendedCard
            setActiveType={setActiveType}
            activeType={activeType}
            key={type}
            type={type}
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
                  {filterRecommendationsByTypeAndSpecialistId(
                    activeType,
                    id,
                    recommendations
                  ).map((recommendation: IRecommendation) => (
                    <Recommendation recommendation={recommendation} />
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
