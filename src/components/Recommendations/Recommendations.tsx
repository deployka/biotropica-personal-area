import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classNames from 'classnames';
import { CreateRecommendationDto } from '../../@types/dto/recommendations/create.dto';
import { Recommendation } from '../../@types/entities/Recommendation';
import { Specialization } from '../../@types/entities/Specialization';
import { RecommendationList } from '../Recommendation/List/List';
import {
  SpecializationList,
  SpecializationListProps,
} from '../Specialization/List/List';

import s from './Recommendations.module.scss';
import Button from '../Button/Button';
import { EditModal } from '../Recommendation/EditModal/EditModal';

type Props = {
  isAdmin: boolean;
  currentUserId: number;
  specializations: Specialization[];
  recommendations: Recommendation[];
  selectedSpecialization: Specialization | null;
  isEditable: boolean;
  openedRecommendation: Recommendation | CreateRecommendationDto | null;
  setSelected: Dispatch<SetStateAction<Specialization | null>>;
  onCreate: () => void;
  setOpened: (
    recommendation: Recommendation | CreateRecommendationDto | null,
  ) => void;
  onEdit: (recommendation: Recommendation) => void;
  onDelete: (id: number) => void;
};

export const RecommendationsPage = ({
  isAdmin,
  specializations,
  currentUserId,
  selectedSpecialization,
  recommendations,
  isEditable,
  onCreate,
  onEdit,
  onDelete,
  setSelected,
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

    console.log(newFilteredRecommendations);

    setFilteredRecommendation(newFilteredRecommendations);

    let newSpecializationsTypes = specializations.map(specialization => ({
      specialization: specialization,
      count: newFilteredRecommendations[specialization.key]?.length || 0,
    }));
    if (!isEditable) {
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
          onSelect={setSelected}
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
            recommendations={
              (filteredRecommendation &&
                filteredRecommendation[selectedSpecialization.key]) ||
              []
            }
            onCreate={onCreate}
            onDelete={onDelete}
            onEdit={onEdit}
            isEditable={isEditable}
          />
        )}
      </div>
    </div>
  );
};
