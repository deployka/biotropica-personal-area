import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classNames from 'classnames';
import { CreateRecommendationDto } from '../../@types/dto/recommendations/create.dto';
import { Recommendation } from '../../@types/entities/Recommendation';
import { Specialization } from '../../@types/entities/Specialization';
import { RecommendationEditor } from '../Recommendation/Editor/Editor';
import { RecommendationList } from '../Recommendation/List/List';
import {
  SpecializationList,
  SpecializationListProps,
} from '../Specialization/List/List';

import s from './Recommendations.module.scss';
import Button from '../Button/Button';

type Props = {
  currentUserId: number;
  specializations: Specialization[];
  recommendations: Recommendation[];
  selectedSpecialization: Specialization | null;
  isSpecialist: boolean;
  setSelectedSpecialization: Dispatch<SetStateAction<Specialization | null>>;
  openedRecommendation: Recommendation | CreateRecommendationDto | null;
  onSaveRecommendation: (values: CreateRecommendationDto) => void;
  onCreateRecommendation: () => void;
  setOpenedRecommendation: (
    recommendation: Recommendation | CreateRecommendationDto | null,
  ) => void;
  onEditRecommendation: (recommendation: Recommendation) => void;
  onDeleteRecommendation: (id: number) => void;
};

export const RecommendationsPage = ({
  specializations,
  currentUserId,
  selectedSpecialization,
  recommendations,
  isSpecialist,
  onSaveRecommendation,
  onCreateRecommendation,
  openedRecommendation,
  onEditRecommendation,
  onDeleteRecommendation,
  setOpenedRecommendation,
  setSelectedSpecialization,
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
    if (!isSpecialist) {
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
          onSelect={setSelectedSpecialization}
          selectedType={selectedSpecialization}
        />
      </div>
      <div
        className={classNames(s.right, selectedSpecialization ? s.opened : '')}
      >
        {selectedSpecialization && (
          <>
            <div className={s.buttons}>
              {isSpecialist && (
                <Button
                  className={s.addButton}
                  isPrimary
                  onClick={onCreateRecommendation}
                >
                  Добавить рекомендацию
                </Button>
              )}
              <Button
                className={s.backButton}
                onClick={() => {
                  setSelectedSpecialization(null);
                }}
              >
                Назад
              </Button>
            </div>
            <RecommendationList
              currentUserId={currentUserId}
              recommendations={
                (filteredRecommendation &&
                  filteredRecommendation[selectedSpecialization.key]) ||
                []
              }
              onDelete={onDeleteRecommendation}
              onEdit={onEditRecommendation}
            />
          </>
        )}
      </div>
      {openedRecommendation && (
        <RecommendationEditor
          title={openedRecommendation?.title || ''}
          description={openedRecommendation?.description || ''}
          onSave={onSaveRecommendation}
          onClose={() => {
            setOpenedRecommendation(null);
          }}
        />
      )}
    </div>
  );
};
