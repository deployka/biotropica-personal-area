import React, { useEffect, useState } from 'react';
import {
  useCreateRecommendationMutation,
  useDeleteRecommendationMutation,
  useGetRecommendationListQuery,
  useUpdateRecommendationMutation,
} from '../../api/recommendations';
import { useGetSpecializationListQuery } from '../../api/specializations';
import { useHistory, useParams } from 'react-router-dom';
import {
  SpecializationList,
  SpecializationListProps,
} from './../../components/Specialization/List/List';
import { RecommendationList } from '../../components/Recommendation/List/List';

import s from './Recommendations.module.scss';
import { useSelector } from 'react-redux';
import { Tabs } from '../../components/Tabs/Tabs';
import { selectIsAdmin, selectIsDoctor } from '../../store/slices/authSlice';

import { Specialization } from '../../@types/entities/Specialization';
import {
  Recommendation,
  RecommendationStatus,
} from '../../@types/entities/Recommendation';
import { CreateRecommendationDto } from '../../@types/dto/recommendations/create.dto';
import { RecommendationsPage } from '../../components/Recommnedations/Recommendations';
import { useCurrentUserQuery } from '../../api/user';
import { Empty } from '../../components/Empty/Empty';

export function Recommendations() {
  const { data: currentUser } = useCurrentUserQuery();
  const currentUserId = currentUser?.id || 0;
  const { userId } = useParams<{ userId: string }>();

  const {
    data: recommendations = [],
    isLoading: isRecommendationsLoading,
    isError: isRecommendationsError,
  } = useGetRecommendationListQuery({
    userId: +userId || currentUserId,
  });
  const {
    data: specializations = [],
    isLoading: isSpecializationsLoading,
    isError: isSpecializationsError,
  } = useGetSpecializationListQuery();
  const [updateRecommendation] = useUpdateRecommendationMutation();
  const [createRecommendation] = useCreateRecommendationMutation();
  const [deleteRecommendation] = useDeleteRecommendationMutation();
  const isSpecialist = useSelector(selectIsDoctor);
  const isAdmin = useSelector(selectIsAdmin);

  const history = useHistory();

  const [selectedSpecialization, setSelectedSpecialization] =
    useState<Specialization | null>(null);

  const [openedRecommendation, setOpenedRecommendation] = useState<
    Recommendation | CreateRecommendationDto | null
  >(null);

  const handleSaveRecommendation = async (value: CreateRecommendationDto) => {
    if (!selectedSpecialization || !openedRecommendation) return;
    const { description, title } = value;
    if ('id' in openedRecommendation) {
      await updateRecommendation({
        description,
        title,
        id: openedRecommendation.id,
      });
    } else {
      await createRecommendation({
        description,
        title,
        status: RecommendationStatus.INITIATED,
        userId: +userId!,
        specialization: selectedSpecialization,
      });
    }

    setOpenedRecommendation(null);
  };
  const handleClickEditRecommendation = (recommendation: Recommendation) => {
    setOpenedRecommendation(recommendation);
  };
  const handleCreateRecommendation = () => {
    setOpenedRecommendation({
      title: '',
      description: '',
    });
  };
  const handleDeleteRecommendation = (id: number) => {
    deleteRecommendation(id);
  };

  const isLoading = isSpecializationsLoading || isRecommendationsLoading;
  const isError = isSpecializationsError || isRecommendationsError;

  const isEditable = isSpecialist || isAdmin;

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
      {isLoading && <p>Загрузка...</p>}
      {isError && <p>Произошла ошибка</p>}
      {!isLoading && !isError && recommendations.length === 0 && !isEditable && (
        <div className={s.emptyWrapper}>
          <Empty className={s.empty}>
            <p>
              У вас еще нет рекомендаций. Они появятся здесь сразу после того,
              как их составит специалист.
            </p>
          </Empty>
        </div>
      )}
      {/* FIXME: сделать нормальный условный рендеринг */}
      {((recommendations.length !== 0 && !isEditable) || isEditable) && (
        <RecommendationsPage
          openedRecommendation={openedRecommendation}
          currentUserId={currentUserId}
          specializations={specializations}
          recommendations={recommendations}
          isSpecialist={isEditable}
          selectedSpecialization={selectedSpecialization}
          setSelectedSpecialization={setSelectedSpecialization}
          onSaveRecommendation={handleSaveRecommendation}
          onCreateRecommendation={handleCreateRecommendation}
          onEditRecommendation={handleClickEditRecommendation}
          onDeleteRecommendation={handleDeleteRecommendation}
          setOpenedRecommendation={setOpenedRecommendation}
        />
      )}
    </div>
  );
}
