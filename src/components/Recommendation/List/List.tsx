import React, { useEffect, useState } from 'react';
import { BaseUser } from '../../../@types/entities/BaseUser';
import { Recommendation } from '../../../@types/entities/Recommendation';

import { RecommendationGroup, RecommendationGroupType } from './../Group/Group';

import s from './List.module.scss';

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
    const specialists: BaseUser[] = [];
    recommendations.forEach(recommendation => {
      if (
        !specialists.find(
          specialists => specialists.id === recommendation.specialist.id,
        )
      ) {
        specialists.push(recommendation.specialist);
      }
    });

    specialists.forEach((specialist: BaseUser) => {
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
