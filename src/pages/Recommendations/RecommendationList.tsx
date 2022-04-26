import React, { useEffect, useState } from 'react';
import {
  RecommendationGroup,
  RecommendationGroupType,
} from '../../components/recommendations/RecommendationGroup/RecommendationGroup';
import { RecommendationItem } from '../../components/recommendations/RecommendationItem/RecommendationItem';
import { Recommendation, User } from '../../store/rtk/types/user';

import s from './Recommendations.module.scss';

type RecommendationListProps = {
  currentSpecialistId: number;
  recommendations: Recommendation[];
  onDelete(id: number): void;
  onEdit(recommendation: Recommendation): void;
};

export const RecommendationList = ({
  recommendations,
  currentSpecialistId,
  onDelete,
  onEdit,
}: RecommendationListProps) => {
  const [recommendationsGroups, setRecommendationsGroups] = useState<
    RecommendationGroupType[]
  >([]);

  useEffect(() => {
    setRecommendationsGroups([]);
    const specialists: User[] = [];
    recommendations.forEach(recommendation => {
      if (
        !specialists.find(
          specialists => specialists.id === recommendation.specialist.id,
        )
      ) {
        specialists.push(recommendation.specialist);
      }
    });

    specialists.forEach((specialist: User) => {
      const specialistRecommendations: Recommendation[] =
        recommendations.filter(
          recommendation => recommendation.specialist.id === specialist.id,
        );

      setRecommendationsGroups(prevState => [
        ...prevState,
        {
          specialist: specialist,
          recommendationList: specialistRecommendations,
        } as RecommendationGroupType,
      ]);
    });
  }, [recommendations]);

  return (
    <div className={s.recommendationList}>
      {recommendationsGroups.map(group => (
        <RecommendationGroup
          isCurrentUser={group.specialist.id === currentSpecialistId}
          key={group.specialist.id}
          recommendationGroup={{
            specialist: group.specialist,
            recommendationList: group.recommendationList,
          }}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
