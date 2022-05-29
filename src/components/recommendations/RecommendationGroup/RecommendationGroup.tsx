import React from 'react';
import { Recommendation, User } from '../../../store/rtk/types/user';
import { getMediaLink } from '../../../utils/mediaHelper';
import { RecommendationItem } from '../RecommendationItem/RecommendationItem';
import defaultAvatar from '../../../assets/images/profile/default_avatar.png';

import s from './RecommendationGroup.module.scss';

export type RecommendationGroupType = {
  specialist: User;
  recommendationList: Recommendation[];
};

type RecommendationGroupProps = {
  isCurrentUser: boolean;
  recommendationGroup: RecommendationGroupType;
  onDelete(id: number): void;
  onEdit(recommendation: Recommendation): void;
};

export const RecommendationGroup = ({
  isCurrentUser,
  recommendationGroup,
  onDelete,
  onEdit,
}: RecommendationGroupProps) => {
  const { specialist, recommendationList } = recommendationGroup;

  return (
    <div className={s.recommendationGroup}>
      <div className={s.header}>
        <div className={s.left}>
          <div className={s.specialistPhoto}>
            <img src={getMediaLink(specialist.profilePhoto) || defaultAvatar} />
          </div>
          {specialist.name} {specialist.lastname}
        </div>
        <div className={s.right}>
          <div className={s.link}></div>
        </div>
      </div>
      <div className={s.divider}></div>
      <div className={s.recommendationsList}>
        {recommendationList.map(recommendation => (
          <RecommendationItem
            editable={isCurrentUser}
            key={recommendation.id}
            title={recommendation.title}
            text={recommendation.description}
            createdAt={new Date(recommendation.createdAt)}
            onDelete={() => {
              onDelete(recommendation.id);
            }}
            onEdit={() => {
              onEdit(recommendation);
            }}
          />
        ))}
      </div>
    </div>
  );
};
