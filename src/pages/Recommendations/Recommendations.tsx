import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  SpecializationList,
  SpecializationListProps,
} from './../../components/Specialization/List/List';
import { RecommendationList } from '../../components/Recommendation/List/List';
import Button from '../../components/Button/Button';
import { RecommendationEditor } from '../../components/Recommendation/Editor/Editor';
import { useSelector } from 'react-redux';
import { Tabs } from '../../components/Tabs/Tabs';
import classNames from 'classnames';

import s from './Recommendations.module.scss';
import { useRequestUserDataQuery } from '../../api/user';
import {
  useCreateRecommendationMutation,
  useDeleteRecommendationMutation,
  useGetRecommendationListQuery,
  useUpdateRecommendationMutation,
} from '../../api/recommendations';
import { useGetSpecializationListQuery } from '../../api/specializations';
import { Specialization } from '../../@types/entities/Specialization';
import {
  Recommendation,
  RecommendationStatus,
} from '../../@types/entities/Recommendation';
import { selectIsDoctor } from '../../store/slices/authSlice';

type CreateRecommendation = {
  title: string;
  description: string;
};

export function Recommendations() {
  const { data: currentUser } = useRequestUserDataQuery();
  const currentUserId = currentUser?.id || 0;
  const { userId } = useParams<{ userId: string }>();
  const { data: recommendations } = useGetRecommendationListQuery({
    userId: +userId || currentUserId,
  });
  const { data: specializations } = useGetSpecializationListQuery();
  const [updateRecommendation] = useUpdateRecommendationMutation();
  const [createRecommendation] = useCreateRecommendationMutation();
  const [deleteRecommendation] = useDeleteRecommendationMutation();
  const isDoctor = useSelector(selectIsDoctor);

  const history = useHistory();

  const [specializationsTypes, setSpecializationsTypes] = useState<
    SpecializationListProps['types']
  >([]);

  const [selectedSpecialization, setSelectedSpecialization] =
    useState<Specialization | null>(null);

  const [filteredRecommendation, setFilteredRecommendation] = useState<Record<
    Specialization['key'],
    Recommendation[]
  > | null>(null);

  const [openedRecommendation, setOpenedRecommendation] = useState<
    Recommendation | CreateRecommendation | null
  >(null);

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

    if (!isDoctor) {
      newSpecializationsTypes = newSpecializationsTypes.filter(it => it.count);
    }

    setSpecializationsTypes(newSpecializationsTypes);

    // if (newSpecializationsTypes.length) {
    // setSelectedSpecialization(newSpecializationsTypes[0].specialization);
    // }
  }, [specializations, recommendations]);

  if (!recommendations || !specializations) {
    return <span>Loading...</span>;
  }

  async function handleSaveRecommendation(value: {
    title: string;
    description: string;
  }) {
    if (!selectedSpecialization || !openedRecommendation) return;

    if ('id' in openedRecommendation) {
      await updateRecommendation({
        description: value.description,
        title: value.title,
        id: openedRecommendation.id,
      });
    } else {
      await createRecommendation({
        description: value.description,
        status: RecommendationStatus.INITIATED,
        title: value.title,
        userId: +userId!,
        specialization: selectedSpecialization,
      });
    }

    setOpenedRecommendation(null);
  }

  function handleClickEditRecommendation(recommendation: Recommendation) {
    setOpenedRecommendation(recommendation);
  }
  function handleCreateRecommendation() {
    setOpenedRecommendation({
      title: '',
      description: '',
    });
  }
  function handleDeleteTask(id: number) {
    deleteRecommendation(id);
  }

  return (
    <div>
      <Tabs
        value="recommendations"
        options={[
          {
            label: 'Задачи',
            value: 'tasks',
          },
          {
            label: 'Рекомендации',
            value: 'recommendations',
          },
        ]}
        onSelect={value => {
          if (value === 'tasks' && !userId) {
            history.push('/');
          } else if (value === 'tasks' && userId) {
            history.push(`/users/${userId}/tasks`);
          }
        }}
      />
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
          className={classNames(
            s.right,
            selectedSpecialization ? s.opened : '',
          )}
        >
          {selectedSpecialization && (
            <>
              <div className={s.buttons}>
                {isDoctor && (
                  <Button
                    className={s.addButton}
                    isPrimary
                    onClick={handleCreateRecommendation}
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
                currentSpecialistId={currentUserId || 0}
                recommendations={
                  filteredRecommendation?.[selectedSpecialization.key] || []
                }
                onDelete={handleDeleteTask}
                onEdit={handleClickEditRecommendation}
              />
            </>
          )}
        </div>
        {openedRecommendation && (
          <RecommendationEditor
            title={openedRecommendation?.title || ''}
            description={openedRecommendation?.description || ''}
            onSave={handleSaveRecommendation}
            onClose={() => {
              setOpenedRecommendation(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
