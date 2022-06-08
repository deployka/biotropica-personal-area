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
import {
  useGetQuestionnaireAnswersQuery,
  useGetUserQuery,
} from '../../../api/user';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { NotificationType } from '../../GlobalNotifications/GlobalNotifications';
import { Profile } from './Profile';

export const PublicProfile = () => {
  const { id } = useParams<{ id: string }>();
  const userId = +id;

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserQuery(userId, { skip: !userId });
  const [createComment, { isLoading: isCreateCommentLoading }] =
    useCreateAnalyzeAnswerCommentMutation();
  const [deleteComment, { isLoading: isDeleteCommentLoading }] =
    useDeleteAnalyzeAnswerCommentMutation();
  const { data: progress = [], isLoading: isProgressLoading } =
    useGetProgressPostsQuery({ userId }, { skip: !userId });
  const { data: goalsList } = useGetGoalsQuery();
  const { data: analyzeTypes = [] } = useGetAnalyzesQuery();
  const { data: analyzes = [] } = useGetAnalyzeAnswersQuery(
    { userId },
    { skip: !userId },
  );

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
      eventBus.emit(EventTypes.notification, {
        message: 'Комментарий добавлен!',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      console.error(error);
      eventBus.emit(EventTypes.notification, {
        message: 'Произошла ошибка, попробуйте еще раз!',
        type: NotificationType.DANGER,
      });
    }
  };

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

  if (!user) {
    return <div>Произошла ошибка</div>;
  }

  return (
    <Profile
      user={user}
      onDeleteComment={onDeleteComment}
      isLoadingComment={isCreateCommentLoading || isDeleteCommentLoading}
      onAddComment={onAddComment}
      progress={progress}
      progressIsLoading={isProgressLoading}
      goalsLength={goalsList?.length || 0}
      questionnaireAnswers={questionnaireAnswers}
      analyzeTypes={analyzeTypes}
      analyzes={analyzes}
    />
  );
};
