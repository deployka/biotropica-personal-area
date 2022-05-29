import React, { useEffect, useState } from 'react';
import {
  useCreateRecommendationMutation,
  useDeleteRecommendationMutation,
  useGetRecommendationListQuery,
  useUpdateRecommendationMutation,
} from '../../store/rtk/requests/recommendations';
import {
  Specialization,
  useGetSpecializationListQuery,
} from '../../store/rtk/requests/specializations';
import {
  Recommendation,
  RecommendationStatus,
} from '../../store/rtk/types/user';
import { useHistory, useParams } from 'react-router-dom';
import {
  SpecializationList,
  SpecializationListProps,
} from '../../components/recommendations/SpecializationList/SpecializationList';
import { RecommendationList } from './RecommendationList';

import s from './Recommendations.module.scss';
import Button from '../../components/Button/Button';
import { RecommendationEditor } from '../../components/recommendations/RecommendationEditor/RecommendationEditor';
import { useSelector } from 'react-redux';
import { selectCurrentUserData } from '../../store/ducks/user/selectors';
import { Tabs } from '../../components/Tabs/Tabs';
import { selectIsDoctor } from '../../store/rtk/slices/authSlice';

type CreateRecommendation = {
  title: string;
  description: string;
};

export function Recommendations() {
  const currentUser = useSelector(selectCurrentUserData);
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

  const [filteredRecommendation, setFilteredRecommendation] = useState<
    Record<Specialization['key'], Recommendation[]>
  >({});

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

    if (newSpecializationsTypes.length) {
      setSelectedSpecialization(newSpecializationsTypes[0].specialization);
    }
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
        <div className={s.left}>
          <SpecializationList
            types={specializationsTypes}
            onSelect={setSelectedSpecialization}
            selectedType={selectedSpecialization}
          />
        </div>
        <div className={s.right}>
          {selectedSpecialization && (
            <>
              {isDoctor && (
                <Button isPrimary onClick={handleCreateRecommendation}>
                  Добавить рекомендацию
                </Button>
              )}

              <RecommendationList
                currentSpecialistId={currentUserId || 0}
                recommendations={
                  filteredRecommendation[selectedSpecialization.key] || []
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
