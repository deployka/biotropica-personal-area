import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  useCreateAnalyzeAnswerCommentMutation,
  useDeleteAnalyzeAnswerCommentMutation,
  useGetAnalyzeAnswersQuery,
} from '../../../api/analyze-answers';
import { useGetAnalyzesQuery } from '../../../api/analyzes';
import { useGetGoalsQuery } from '../../../api/goals';
import { useGetProgressPostsQuery } from '../../../api/progress';
import { useGetCurrentSpecialistQuery } from '../../../api/specialists';
import { useGetUserTariffByIdQuery } from '../../../api/tariffs';
import {
  useGetFollowedSpecialistsQuery,
  useGetQuestionnaireAnswersQuery,
  useGetUserQuery,
} from '../../../api/user';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { NotificationType } from '../../GlobalNotifications/GlobalNotifications';
import { Profile } from './Profile';
import { useDeleteNotificationMutation } from '../../../api/notifications';

export const PublicProfile = () => {
  const { id } = useParams<{ id: string }>();
  const userId = +id;

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserQuery(userId, { skip: !userId });

  const { data: currentSpecialist } = useGetCurrentSpecialistQuery();

  const [createComment, { isLoading: isCreateCommentLoading }] =
    useCreateAnalyzeAnswerCommentMutation();

  const [deleteComment, { isLoading: isDeleteCommentLoading }] =
    useDeleteAnalyzeAnswerCommentMutation();
    
  const [deleteNotification] =
    useDeleteNotificationMutation();

  const { data: progress = [], isLoading: isProgressLoading } =
    useGetProgressPostsQuery({ userId }, { skip: !userId });

  const { data: goalsList } = useGetGoalsQuery();

  const { data: analyzeTypes = [] } = useGetAnalyzesQuery();

  const { data: analyzes = [] } = useGetAnalyzeAnswersQuery(
    { userId },
    { skip: !userId },
  );

  const { data: currentTariff } = useGetUserTariffByIdQuery(userId, {
    skip: !userId,
  });

  const { data: questionnaireAnswers = [] } = useGetQuestionnaireAnswersQuery(
    userId,
    { skip: !userId },
  );

  const onAddComment = async (comment: string, analyzeId: number) => {
    try {
      await createComment({
        text: comment,
        analyzeAnswerId: analyzeId,
      }).unwrap();
      // eventBus.emit(EventTypes.notification, {
      //   message: 'Комментарий добавлен!',
      //   type: NotificationType.SUCCESS,
      // }
    } catch (error) {
      console.error(error);
      // eventBus.emit(EventTypes.notification, {
      //   message: 'Произошла ошибка, попробуйте еще раз!',
      //   type: NotificationType.DANGER,
      // });
    }
  };

  const { data: specialistsList = [] } = useGetFollowedSpecialistsQuery(
    {
      id: userId,
    },
    { skip: !userId },
  );

  const onDeleteComment = async (id: number) => {
    try {
      await deleteComment({ id }).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Комментарий удален',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      console.log(error);
      eventBus.emit(EventTypes.notification, {
        message: 'Произошла ошибка, попробуйте еще раз!',
        type: NotificationType.DANGER,
      });
    }
  };

  if (isUserLoading) {
    return <p>Загрузка...</p>;
  }

  if (!isUserLoading && isUserError) {
    return <div>Произошла ошибка</div>;
  }

  if (!isUserLoading && user) {
    return (
      <Profile
        currentTariff={currentTariff}
        currentUserId={currentSpecialist?.id || 0}
        user={user}
        onDeleteComment={onDeleteComment}
        isLoadingComment={isCreateCommentLoading || isDeleteCommentLoading}
        onAddComment={onAddComment}
        specialistsList={specialistsList}
        progress={progress}
        progressIsLoading={isProgressLoading}
        goalsLength={goalsList?.length || 0}
        questionnaireAnswers={questionnaireAnswers}
        analyzeTypes={analyzeTypes}
        analyzes={analyzes}
      />
    );
  }

  return <></>;
};
