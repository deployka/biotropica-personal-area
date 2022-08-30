import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import type { CreateRecommendationDto } from '../../@types/dto/recommendations/create.dto';
import type { Recommendation } from '../../@types/entities/Recommendation';
import type { Specialization } from '../../@types/entities/Specialization';
import type { UpdateRecommendationDto } from '../../@types/dto/recommendations/update.dto';
import { RecommendationList } from '../Recommendation/List/List';
import {
  SpecializationList,
  SpecializationListProps,
} from '../Specialization/List/List';
import classNames from 'classnames';
import type { BaseUser } from '../../@types/entities/BaseUser';

import s from './Recommendations.module.scss';
import {
  getSpecializationTypes,
  groupRecommendationsBySpecialization,
} from './recommendationsHelper';

type SpecializationRecommendations = Partial<
  Record<Specialization['key'], Recommendation[]>
>;

type Props = {
  isAdmin: boolean;
  currentUserId: BaseUser['id'];
  canCreate: boolean;
  specializations: Specialization[];
  recommendations: Recommendation[];
  selectedSpecialization: Specialization | null;
  onCreate: () => void;
  onEdit: (recommendation: Recommendation) => void;
  onDelete: (id: number) => void;
  onClickSpecialization: (specialization: Specialization | null) => void;
};

export const RecommendationsPage = ({
  isAdmin,
  canCreate,
  currentUserId,
  specializations,
  recommendations,
  selectedSpecialization,
  onCreate,
  onEdit,
  onDelete,
  onClickSpecialization,
}: Props) => {
  const groupedRecommendations = groupRecommendationsBySpecialization(
    recommendations,
    specializations,
  );

  const specializationsTypes = getSpecializationTypes(
    specializations,
    groupedRecommendations,
    canCreate,
  );

  return (
    <div className={s.recommendationPage}>
      <div
        className={classNames(s.left, selectedSpecialization ? s.opened : '')}
      >
        <SpecializationList
          types={specializationsTypes}
          onSelect={onClickSpecialization}
          selectedType={selectedSpecialization}
        />
      </div>
      <div
        className={classNames(s.right, selectedSpecialization ? s.opened : '')}
      >
        {selectedSpecialization && (
          <RecommendationList
            isAdmin={isAdmin}
            currentUserId={currentUserId}
            canCreate={canCreate}
            recommendations={
              groupedRecommendations[selectedSpecialization.key] || []
            }
            onCreate={onCreate}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )}
      </div>
    </div>
  );
};
