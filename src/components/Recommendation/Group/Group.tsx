import React from 'react';
import { getMediaLink } from '../../../utils/mediaHelper';
import { RecommendationItem } from '../Item/Item';
import { useHistory } from 'react-router';
import { Recommendation } from '../../../@types/entities/Recommendation';
import { BaseUser } from '../../../@types/entities/BaseUser';
import defaultAvatar from '../../../assets/images/profile/default_avatar.png';

import s from './Group.module.scss';
import { getUserRolesList } from '../../../utils/getUserRolesList';
import { ROLE } from '../../../@types/entities/Role';

export type RecommendationGroupType = {
  isEditable: boolean;
  specialist: BaseUser;
  recommendationList: Recommendation[];
};

type RecommendationGroupProps = {
  isAdmin: boolean;
  recommendationGroup: RecommendationGroupType;
  onDelete(id: number): void;
  onEdit(recommendation: Recommendation): void;
};

export const RecommendationGroup = ({
  isAdmin,
  recommendationGroup,
  onDelete,
  onEdit,
}: RecommendationGroupProps) => {
  const { isEditable, specialist, recommendationList } = recommendationGroup;

  const history = useHistory();

  const isAdminCreator = getUserRolesList(specialist).includes(ROLE.ADMIN);

  function moveToSpecialist() {
    if (isAdminCreator) return;
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
          {isAdminCreator && !isAdmin
            ? 'Администратор'
            : `${specialist.name} ${specialist.lastname}`}
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
