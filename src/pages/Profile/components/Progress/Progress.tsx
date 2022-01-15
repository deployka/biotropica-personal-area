import React, { useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { ProgressCard } from './ProgressCard/ProgressCard';

import s from './Progress.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProgressData,
  selectProgressLoadingStatus,
} from '../../../../store/ducks/progress/selectors';
import { Progress as IProgress } from '../../../../store/ducks/progress/contracts/state';

import { fetchProgressData } from '../../../../store/ducks/progress/actionCreators';
import { IInfoBar, InfoBar } from '../../../../shared/Global/InfoBar/InfoBar';
import { ModalName } from '../../../../providers/ModalProvider';
import { useModal } from '../../../../hooks/useModal';
import { LoadingStatus } from '../../../../store/types';

interface Props {
  isPublic?: boolean;
  user: User;
}

export const Progress = ({ isPublic, user }: Props) => {
  const dispatch = useDispatch();

  const { openModal } = useModal();

  const infoBar: IInfoBar = {
    title: !isPublic
      ? 'Пользователь не загружал прогресс'
      : 'У вас нет загруженного прогресса',
    text: !isPublic
      ? ''
      : 'Вы еще не загрузили фото прогресса. Сделайте это нажав на ссылку ниже',
    bottomLink: !isPublic
      ? ''
      : 'Загрузить фото',
    onClick: () => {
      openModal(ModalName.MODAL_ADD_PROGRESS_PHOTO, { user });
    },
  };

  const progress: IProgress[] = useSelector(selectProgressData) || [];
  const loadingStatus = useSelector(selectProgressLoadingStatus);
  const isLoading = loadingStatus === LoadingStatus.LOADING;
  useEffect(() => {
    dispatch(fetchProgressData(user.id));
  }, []);

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
