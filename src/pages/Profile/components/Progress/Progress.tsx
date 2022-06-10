import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { ProgressCard } from './ProgressCard/ProgressCard';

import s from './Progress.module.scss';

import { IInfoBar, InfoBar } from '../../../../shared/Global/InfoBar/InfoBar';
import { ModalName } from '../../../../providers/ModalProvider';
import { useModal } from '../../../../hooks/useModal';
import { Progress as IProgress } from '../../../../@types/entities/Progress';
import { useGetProgressPostsQuery } from '../../../../api/progress';
import { BaseUser } from '../../../../@types/entities/BaseUser';

interface Props {
  user: BaseUser;
}

export const Progress = ({ user }: Props) => {
  const { openModal } = useModal();

  const infoBar: IInfoBar = {
    title: 'У вас нет загруженного прогресса',
    text: 'Вы еще не загрузили фото прогресса. Сделайте это нажав на ссылку ниже',
    bottomLink: 'Загрузить фото',
    onClick: () => {
      openModal(ModalName.MODAL_ADD_PROGRESS_PHOTO, { user });
    },
  };

  const { data: progress = [], isLoading } = useGetProgressPostsQuery({
    userId: user.id,
  });

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
            <ProgressCard key={card.id} card={card} />
          ))}
        </div>
      </PerfectScrollbar>
    </>
  );
};
