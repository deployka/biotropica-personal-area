import React, { useEffect, useState } from 'react';
import { BaseUser } from '../../../@types/entities/BaseUser';
import { Recommendation } from '../../../@types/entities/Recommendation';
import Button from '../../Button/Button';

import { RecommendationGroup, RecommendationGroupType } from './../Group/Group';

import s from './List.module.scss';

type RecommendationListProps = {
  recommendations: Recommendation[];
  isAdmin: boolean;
  currentUserId: BaseUser['id'];
  canCreate: boolean;
  onCreate: () => void;
  onDelete: (id: number) => void;
  onEdit: (recommendation: Recommendation) => void;
};

export const RecommendationList = ({
  isAdmin,
  canCreate,
  recommendations,
  currentUserId,
  onCreate,
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
      {canCreate && (
        <Button className={s.addButton} isPrimary onClick={onCreate}>
          Добавить рекомендацию
        </Button>
      )}
      {recommendationsGroups.map(group => (
        <RecommendationGroup
          key={group.specialist.id}
          isAdmin={isAdmin}
          recommendationGroup={{
            isEditable: isAdmin || group.specialist.id === currentUserId,
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
