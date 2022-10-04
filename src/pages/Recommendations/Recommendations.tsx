import React, { useState } from 'react';
import {
  useCreateRecommendationMutation,
  useDeleteRecommendationMutation,
  useGetRecommendationListQuery,
  useUpdateRecommendationMutation,
} from '../../api/recommendations';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import type { UpdateRecommendationDto } from '../../@types/dto/recommendations/update.dto';
import type { Specialization } from '../../@types/entities/Specialization';
import { Recommendation } from '../../@types/entities/Recommendation';

import { useCurrentUserQuery } from '../../api/user';
import { useGetSpecializationListQuery } from '../../api/specializations';
import { selectIsAdmin, selectIsDoctor } from '../../store/slices/authSlice';

import { Tabs } from '../../components/Tabs/Tabs';
import { RecommendationsPage } from '../../components/Recommendations/Recommendations';
import { Empty } from '../../components/Empty/Empty';
import { EditModal } from '../../components/Recommendation/EditModal/EditModal';

import s from './Recommendations.module.scss';
import {
  errorCreateRecommendationNotification,
  errorDeleteRecommendationNotification,
  successCreateRecommendationNotification,
  successDeleteRecommendationNotification,
} from './recommendationsNotifications';
import { ResponseError } from '../../@types/api/response';
import { CreateRecommendationDto } from '../../@types/dto/recommendations/create.dto';
import { RecommendationForm } from '../../components/Recommendation/EditForm/EditForm';

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

  const [openedRecommendation, setOpenedRecommendation] =
    useState<UpdateRecommendationDto | null>(null);

  const onClickCreateRecommendation = () => {
    setOpenedRecommendation({
      id: 0,
      title: '',
      description: '',
    });
  };
  const onClickEditRecommendation = (recommendation: Recommendation) => {
    setOpenedRecommendation(recommendation);
  };

  const handleCreateRecommendation = async (data: RecommendationForm) => {
    const executorUserId = +userId;
    if (!selectedSpecialization || isNaN(executorUserId)) return;
    try {
      await createRecommendation({
        ...data,
        userId: executorUserId,
        specializationId: selectedSpecialization.id,
      }).unwrap();
      successCreateRecommendationNotification();
      setOpenedRecommendation(null);
    } catch (error) {
      console.log(error);
      errorCreateRecommendationNotification(error as ResponseError);
    }
  };

  const handleUpdateRecommendation = async (data: RecommendationForm) => {
    if (!openedRecommendation) return;
    try {
      await updateRecommendation({
        id: openedRecommendation.id,
        ...data,
      }).unwrap();
      successCreateRecommendationNotification();
      setOpenedRecommendation(null);
    } catch (error) {
      console.log(error);
      errorCreateRecommendationNotification(error as ResponseError);
    }
  };

  const handleDeleteRecommendation = async (id: number) => {
    try {
      await deleteRecommendation({ id }).unwrap();
      successDeleteRecommendationNotification();
    } catch (error) {
      console.log(error);
      errorDeleteRecommendationNotification();
    }
  };

  const isLoading = isSpecializationsLoading || isRecommendationsLoading;
  const isError = isSpecializationsError || isRecommendationsError;

  const canCreate = isSpecialist || isAdmin;

  if (isLoading) return <p>Загрузка...</p>;
  if (!isLoading && isError) return <p>Произошла ошибка</p>;
  if (!isLoading && !isError && !canCreate && !recommendations.length) {
    return (
      <>
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
        <div className={s.emptyWrapper}>
          <Empty className={s.empty}>
            <p>
              У вас еще нет рекомендаций. Они появятся здесь сразу после того,
              как их составит специалист.
            </p>
          </Empty>
        </div>
      </>
    );
  }

  return (
    <>
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

      <RecommendationsPage
        isAdmin={isAdmin}
        currentUserId={currentUserId}
        canCreate={canCreate}
        specializations={specializations}
        recommendations={recommendations}
        selectedSpecialization={selectedSpecialization}
        onClickSpecialization={setSelectedSpecialization}
        onCreate={onClickCreateRecommendation}
        onEdit={onClickEditRecommendation}
        onDelete={handleDeleteRecommendation}
      />

      <EditModal
        isOpened={!!openedRecommendation}
        recommendation={openedRecommendation}
        onCreate={handleCreateRecommendation}
        onEdit={handleUpdateRecommendation}
        onClose={() => setOpenedRecommendation(null)}
      />
    </>
  );
}
