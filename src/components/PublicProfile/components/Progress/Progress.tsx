import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { ProgressCard } from './ProgressCard/ProgressCard';

import s from './Progress.module.scss';
import { Progress as IProgress } from '../../../../store/ducks/progress/contracts/state';

import { IInfoBar, InfoBar } from '../../../../shared/Global/InfoBar/InfoBar';
import { LoadingStatus } from '../../../../store/types';

interface Props {
  progress: IProgress[];
  loadingStatus: LoadingStatus;
}

export const Progress = ({ progress, loadingStatus }: Props) => {
  const infoBar: IInfoBar = {
    title: 'Пользователь не загружал прогресс',
    text: '',
    bottomLink: '',
  };

  const isLoading = loadingStatus === LoadingStatus.LOADING;

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
