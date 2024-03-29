import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { ProgressCard } from './ProgressCard/ProgressCard';

import s from './Progress.module.scss';

import { IInfoBar, InfoBar } from '../../../../shared/Global/InfoBar/InfoBar';
import { Progress as IProgress } from '../../../../@types/entities/Progress';

interface Props {
  progress: IProgress[];
  isLoading: boolean;
}

export const Progress = ({ progress, isLoading }: Props) => {
  const infoBar: IInfoBar = {
    title: 'Пользователь не загружал прогресс',
    text: '',
    bottomLink: '',
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
            <ProgressCard key={card.id} card={card} />
          ))}
        </div>
      </PerfectScrollbar>
    </>
  );
};
