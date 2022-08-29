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
  const [specializationsTypes, setSpecializationsTypes] = useState<
    SpecializationListProps['types']
  >([]);

  const [filteredRecommendation, setFilteredRecommendation] = useState<Record<
    Specialization['key'],
    Recommendation[]
  > | null>(null);

  useEffect(() => {
    if (!specializations || !recommendations) return;

    const newFilteredRecommendations = specializations.reduce((acc, spec) => {
      acc[spec.key] = recommendations.filter(
        rec => rec.specialization.key === spec.key,
      );
      return acc;
    }, {} as Record<Specialization['key'], Recommendation[]>);

    setFilteredRecommendation(newFilteredRecommendations);

    let newSpecializationsTypes = specializations.map(specialization => ({
      specialization: specialization,
      count: newFilteredRecommendations[specialization.key]?.length || 0,
    }));
    if (!canCreate) {
      newSpecializationsTypes = newSpecializationsTypes.filter(it => it.count);
    }
    setSpecializationsTypes(newSpecializationsTypes);
  }, [specializations, recommendations]);

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
              (filteredRecommendation &&
                filteredRecommendation[selectedSpecialization.key]) ||
              []
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
