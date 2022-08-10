import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { ProgressCard } from './ProgressCard/ProgressCard';

import s from './Progress.module.scss';

import { IInfoBar, InfoBar } from '../../../../shared/Global/InfoBar/InfoBar';
import { ModalName } from '../../../../providers/ModalProvider';
import { useModal } from '../../../../hooks/useModal';
import { Progress as IProgress } from '../../../../@types/entities/Progress';
import {
  useDeleteProgressPostMutation,
  useGetProgressPostsQuery,
} from '../../../../api/progress';
import { BaseUser } from '../../../../@types/entities/BaseUser';
import { DeleteProgressPostDto } from '../../../../@types/dto/progress/delete.dto';
import { eventBus, EventTypes } from '../../../../services/EventBus';
import { NotificationType } from '../../../../components/GlobalNotifications/GlobalNotifications';
import { NotificationButtons } from './NotificationButtons';

interface Props {
  user: BaseUser;
}

export const Progress = ({ user }: Props) => {
  const { openModal } = useModal();

  const infoBar: IInfoBar = {
    title: 'У вас нет загруженного прогресса',
    text: 'Вы еще не загрузили фото прогресса. Сделайте это нажав на ссылку ниже',
    bottomLink: 'Загрузить фото',
    onBottomClick: () => {
      openModal(ModalName.MODAL_ADD_PROGRESS_PHOTO, { user });
    },
  };

  const { data: progress = [], isLoading } = useGetProgressPostsQuery({
    userId: user.id,
  });

  const [deleteProgressPost] = useDeleteProgressPostMutation();

  const deleteProgress = async (deletePostData: DeleteProgressPostDto) => {
    try {
      await deleteProgressPost(deletePostData).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Запись удалена',
        type: NotificationType.SUCCESS,
        autoClose: 10000,
      });
    } catch (error) {
      console.error(error);
      eventBus.emit(EventTypes.notification, {
        title: 'Ошибка!',
        message: 'Произошла ошибка при удалении прогресса',
        type: NotificationType.DANGER,
        autoClose: 10000,
      });
    }
  };

  const clickDeleteProgress = (deletePostData: DeleteProgressPostDto) => {
    eventBus.emit(EventTypes.notification, {
      title: 'Удалить запись прогресса?',
      message: (
        <NotificationButtons
          onChange={() => deleteProgress(deletePostData)}
          onDiscard={() => {
            console.log('Отмена');
          }}
        />
      ),
      type: NotificationType.INFO,
      theme: 'light',
    });
  };

  if (!progress.length && !isLoading) {
    return <InfoBar infoBar={infoBar} />;
  }
  if (isLoading) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <>
      <PerfectScrollbar>
        <div className={s.progress}>
          {progress.map((card: IProgress) => (
            <ProgressCard
              key={card.id}
              card={card}
              onDelete={() => {
                clickDeleteProgress({ id: card.id });
              }}
            />
          ))}
        </div>
      </PerfectScrollbar>
    </>
  );
};
