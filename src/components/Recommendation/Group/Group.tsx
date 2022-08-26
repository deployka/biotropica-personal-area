import React from 'react';
import { getMediaLink } from '../../../utils/mediaHelper';
import { RecommendationItem } from '../Item/Item';
import { useHistory } from 'react-router';
import { Recommendation } from '../../../@types/entities/Recommendation';
import { BaseUser } from '../../../@types/entities/BaseUser';
import defaultAvatar from '../../../assets/images/profile/default_avatar.png';

import s from './Group.module.scss';

export type RecommendationGroupType = {
  specialist: BaseUser;
  recommendationList: Recommendation[];
};

type RecommendationGroupProps = {
  isEditable: boolean;
  recommendationGroup: RecommendationGroupType;
  onDelete(id: number): void;
  onEdit(recommendation: Recommendation): void;
};

export const RecommendationGroup = ({
  isEditable,
  recommendationGroup,
  onDelete,
  onEdit,
}: RecommendationGroupProps) => {
  const { specialist, recommendationList } = recommendationGroup;

  const history = useHistory();

  console.log('specialist', specialist);

  function moveToSpecialist() {
    history.push('/specialists/' + specialist.specialist?.id);
  }

  return (
    <div className={s.recommendationGroup}>
      <div className={s.header}>
        <div onClick={moveToSpecialist} className={s.left}>
          <div className={s.specialistPhoto}>
            <img
              src={getMediaLink(specialist.profilePhoto || '') || defaultAvatar}
            />
          </div>
          {specialist.name} {specialist.lastname}
        </div>
        <div className={s.right}></div>
      </div>
      <div className={s.divider}></div>
      <div className={s.recommendationsList}>
        {recommendationList.map(recommendation => (
          <RecommendationItem
            isEditable={isEditable}
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
