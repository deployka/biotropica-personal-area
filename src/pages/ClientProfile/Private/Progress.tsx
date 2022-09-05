import { FormikHelpers } from 'formik';
import React from 'react';
import { ResponseError } from '../../../@types/api/response';
import { CreateProgressDto } from '../../../@types/dto/progress/create.dto';
import { DeleteProgressPostDto } from '../../../@types/dto/progress/delete.dto';
import { ProgressPhotoType } from '../../../@types/entities/Progress';
import { useUploadFilesMutation } from '../../../api/files';
import {
  useCreateProgressPostMutation,
  useDeleteProgressPostMutation,
  useGetProgressPostsQuery,
} from '../../../api/progress';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { Files } from '../../../components/ProgressTab/AddPhotoModal/AddPhotoModal';
import { ProgressTabNotificationButtons } from '../../../components/ProgressTab/NotificationButtons/NotificationButtons';
import { ProgressTab } from '../../../components/ProgressTab/ProgressTab';
import { eventBus, EventTypes } from '../../../services/EventBus';
import {
  errorDeleteProgressNotification,
  successDeleteProgressNotification,
} from './notifications';

type Props = {
  userId: number;
  isAccess: boolean;
};

export const Progress = ({ userId, isAccess }: Props) => {
  const [deleteProgressPost] = useDeleteProgressPostMutation();
  const [fetchUploadFiles, { isLoading: isFilesLoading }] =
    useUploadFilesMutation();
  const [createProgress, { isLoading: isCreateProgressLoading }] =
    useCreateProgressPostMutation();

  const { data: progressPosts = [], isLoading: isProgressLoading } =
    useGetProgressPostsQuery({
      userId,
    });

  const deleteProgress = async (deletePostData: DeleteProgressPostDto) => {
    try {
      await deleteProgressPost(deletePostData).unwrap();
      successDeleteProgressNotification();
    } catch (error) {
      console.error(error);
      errorDeleteProgressNotification();
    }
  };

  const clickDeleteProgress = (id: number) => {
    eventBus.emit(EventTypes.notification, {
      title: 'Удалить запись прогресса?',
      // FIXME: вынести кнопки в отдельный компонент и везде переиспользовать
      message: (
        <ProgressTabNotificationButtons
          onChange={() => deleteProgress({ id })}
          onDiscard={() => {
            console.log('Отмена');
          }}
        />
      ),
      type: NotificationType.INFO,
      theme: 'light',
    });
  };

  async function onCreateProgressPost(
    values: Files,
    options: FormikHelpers<Files>,
  ) {
    if (!values.back || !values.front || !values.side) {
      return;
    }
    try {
      const files = await fetchUploadFiles({
        files: [values.back, values.front, values.side],
      }).unwrap();

      const data: CreateProgressDto = {
        photos: [
          {
            filename: files[0].name,
            type: ProgressPhotoType.BACK,
          },
          {
            filename: files[1].name,
            type: ProgressPhotoType.FRONT,
          },
          {
            filename: files[2].name,
            type: ProgressPhotoType.SIDE,
          },
        ],
      };
      await createProgress(data).unwrap();
      eventBus.emit(EventTypes.notification, {
        title: 'Успешно!',
        message: 'Фотографии успешно загружены!',
        type: NotificationType.SUCCESS,
      });
      options.resetForm();
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        title: 'Ошибка!',
        message: (error as ResponseError).data.message,
        type: NotificationType.DANGER,
      });
    }
  }

  return (
    <ProgressTab
      isAccess={isAccess}
      isLoading={isProgressLoading}
      progressPosts={progressPosts}
      onCreatePost={onCreateProgressPost}
      onDeletePost={clickDeleteProgress}
    />
  );
};
