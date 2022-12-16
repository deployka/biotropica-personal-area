import React, { useState } from 'react';
import { CreateAnalyzeAnswerDto } from '../../../@types/dto/analyzes/create.dto';
import { DeleteAnalyzeAnswerDto } from '../../../@types/dto/analyzes/delete.dto';
import { BaseUser } from '../../../@types/entities/BaseUser';
import {
  useCreateAnalyzeAnswerCommentMutation,
  useCreateAnalyzeAnswerMutation,
  useDeleteAnalyzeAnswerCommentMutation,
  useDeleteAnalyzeAnswerMutation,
  useGetAnalyzeAnswersQuery,
} from '../../../api/analyze-answers';
import { useGetAnalyzesQuery } from '../../../api/analyzes';
import { useUploadFileMutation } from '../../../api/files';
import { useCurrentUserQuery } from '../../../api/user';
import { AnalyzesTab } from '../../../components/AnalyzesTab/AnalyzesTab';
import { ClientProfileLayout } from '../../../components/ProfileLayout/Client/Client';
import {
  errorCreateCommentNotification,
  errorDeleteAnalyzeNotification,
  errorDeleteCommentNotification,
  successCreateAnalyzeNotification,
  successCreateCommentNotification,
  successDeleteAnalyzeNotification,
  successDeleteCommentNotification,
} from './notifications';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { Button } from '../../../shared/Form/Button/Button';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';

type Props = {
  userId: number;
  isAccess: boolean;
};

export const Analyzes = ({ userId, isAccess }: Props) => {
  const { data: analyzeTypes = [], isLoading: isAnalyzesTypesLoading = false } =
    useGetAnalyzesQuery();
  const { data: analyzes = [], isLoading: isAnalyzesLoading = false } =
    useGetAnalyzeAnswersQuery({ userId });

  const [uploadFile] = useUploadFileMutation();
  const [createAnalyzeAnswer, { isLoading: isCreateAnalyzeAnswerLoading }] =
    useCreateAnalyzeAnswerMutation();
  const [deleteAnalyzeAnswer] = useDeleteAnalyzeAnswerMutation();

  const [createComment, { isLoading: isCreateCommentLoading }] =
    useCreateAnalyzeAnswerCommentMutation();
  const [deleteComment] = useDeleteAnalyzeAnswerCommentMutation();

  const handleSubmitAnalyzes = async (values: CreateAnalyzeAnswerDto) => {
    try {
      if (!values.filePath) throw new Error('Файл отсутствует');
      const loadedFileData = await uploadFile({
        file: values.filePath,
      }).unwrap();

      if (!loadedFileData) throw new Error('Файл не загружен');
      await createAnalyzeAnswer({
        text: values.text,
        filePath: loadedFileData.name,
      }).unwrap();
      successCreateAnalyzeNotification();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteAnalyze = async (id: number) => {
    try {
      await deleteAnalyzeAnswer({ id }).unwrap();
      successDeleteAnalyzeNotification();
    } catch (error) {
      console.error(error);
      errorDeleteAnalyzeNotification();
    }
  };

  const onAddComment = async (comment: string, analyzeId: number) => {
    try {
      await createComment({
        text: comment,
        analyzeAnswerId: analyzeId,
      }).unwrap();
      successCreateCommentNotification();
    } catch (error) {
      console.error(error);
      errorCreateCommentNotification();
    }
  };

  const onDeleteComment = async (id: number) => {
    try {
      await deleteComment({ id }).unwrap();
      successDeleteCommentNotification();
    } catch (error) {
      console.log(error);
      errorDeleteCommentNotification();
    }
  };

  const deleteAnalize = async (
    id: number,
  ) => {
    eventBus.emit(EventTypes.notification, {
      title: 'Удаление анализа',
      message: (
        <>
          <Button
            style={{
              marginRight: '20px',
              marginBottom: '5px',
              marginTop: '5px',
              background: '#fff',
              color: '#000',
            }}
            onClick={() => handleDeleteAnalyze(id)}
            options={{
              content: 'Удалить',
              width: '100px',
              height: '30px',
            }}
          />
          <Button
            style={{
              color: '#fff',
              marginBottom: '5px',
              marginTop: '5px',
              border: '1px solid #fff',
            }}
            name="discard"
            options={{
              content: 'Отмена',
              width: '100px',
              height: '30px',
              classes: { discard: true },
            }}
          />
        </>
      ),
      type: NotificationType.INFO,
      theme: 'dark',
      autoClose: false,
    });
  };

  return (
    <AnalyzesTab
      currentUserId={userId}
      isAccess={isAccess}
      isEditable={true}
      isAnalyzesLoading={isAnalyzesTypesLoading || isAnalyzesLoading}
      isAddAnalyzeLoading={isCreateAnalyzeAnswerLoading}
      analyzes={analyzes}
      analyzeTypes={analyzeTypes}
      onAddAnalyze={handleSubmitAnalyzes}
      onDeleteAnalyze={deleteAnalize}
      onAddComment={onAddComment}
      onDeleteComment={onDeleteComment}
    />
  );
};
