import React, { useEffect, useState } from 'react';
import s from './TestsAndAnalyze.module.scss';
import { AnalyzesCard } from './AnalyzesCard/AnalyzesCard';
import { IInfoBar, InfoBar } from '../../../../shared/Global/InfoBar/InfoBar';
import { ModalName } from '../../../../providers/ModalProvider';
import { useModal } from '../../../../hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAnalyzeLoadingStatus,
  selectAnalyzeResponse,
} from '../../../../store/ducks/analyze/selectors';

import {
  createAnalyzeAnswerData,
  setAnalyzeLoadingStatus,
  setAnalyzeResponse,
} from '../../../../store/ducks/analyze/actionCreators';
import {
  Analyze,
  AnalyzeAnswer,
  CreateAnalyzeAnswerData,
} from '../../../../store/ducks/analyze/contracts/state';
import FileService from '../../../../services/FileService';
import { validationSchema } from './validationSchema';
import {
  selectAnalyzesData,
  selectAnalyzesResponse,
} from '../../../../store/ducks/analyzes/selectors';
import {
  fetchAnalyzesData,
  setAnalyzesData,
} from '../../../../store/ducks/analyzes/actionCreators';
import AnalyzeService from '../../../../services/AnalyzeService';
import { NEXT_FETCH_LIMIT, MIN_LIMIT } from '../../../../constants/analyzes';
import { MAX_PDF_SIZE } from '../../../../constants/files';
import { eventBus, EventTypes } from '../../../../services/EventBus';
import { NotificationType } from '../../../../components/GlobalNotifications/GlobalNotifications';
import { Questionnaire } from './Questionnaire/Questionnaire';
import UserService from '../../../../services/UserService';
import { Client } from '../../../../@types/entities/Client';
import { useGetAnalyzesQuery } from '../../../../api/analyzes';
import {
  useCreateAnalyzeAnswerMutation,
  useGetAnalyzeAnswersQuery,
} from '../../../../api/analyze-answers';
import { CreateAnalyzeAnswerDto } from '../../../../@types/dto/analyzes/create.dto';

interface Props {
  user: Client;
}

export const TestsAndAnalyze = ({ user }: Props) => {
  const { openModal, closeModal } = useModal();
  const [isShowMore, setIsShowMore] = useState(false);

  const [fetchCreateAnalyzeAnswer] = useCreateAnalyzeAnswerMutation();
  const { data: analyzeTypes = [] } = useGetAnalyzesQuery();
  const { data: analyzes = [] } = useGetAnalyzeAnswersQuery({
    userId: user.id,
  });

  const handleCreateAnalyzeAnswer = async (values: CreateAnalyzeAnswerDto) => {
    try {
      await fetchCreateAnalyzeAnswer(values).unwrap;
      eventBus.emit(EventTypes.notification, {
        message: 'Анализ успешно загружен',
        type: NotificationType.SUCCESS,
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    } catch (error) {
      console.log(error);
      eventBus.emit(EventTypes.notification, {
        title: 'Ошибка!',
        message: 'Произошла непредвиденная ошибка!',
        type: NotificationType.DANGER,
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    }
  };

  const handleAddAnalyze = () => {
    return openModal(ModalName.MODAL_ADD_ANALYZ_FILE, {
      onSubmit: handleCreateAnalyzeAnswer,
      validationSchema,
      onErrorFileLoaded: () => {
        eventBus.emit(EventTypes.notification, {
          title: 'Файл не был загружен!',
          message: `Допустимые типы анализов:
           pdf Максимальный размер файла: ${MAX_PDF_SIZE} мб`,
          type: NotificationType.DANGER,
          id: 'file_type_error',
          dismiss: {
            duration: 7000,
            onScreen: true,
          },
        });
      },
      onSuccessFileLoaded: () =>
        eventBus.emit(EventTypes.removeNotification, 'file_type_error'),
    });
  };

  function addAnalyzeOpen() {
    return;
  }

  const testInfoBar: IInfoBar = {
    title: 'Вы не заполняли анкету',
    text: 'Пожалуйста, заполните анкету',
    href: '/questionnaire',
    bottomLink: 'Заполнить анкету',
  };

  const analyzesInfoBar: IInfoBar = {
    title: 'Вы не добавляли анализы',
    text: 'У вас нет загруженных анализов.',
    bottomLink: 'Загрузить анализы',
    onClick: () => {
      handleAddAnalyze();
    },
  };

  function onShowMoreClick() {
    setIsShowMore(!isShowMore);
  }

  return (
    <div className={s.tests__and__analyze}>
      {/* {answers.length ? (
        <Questionnaire
          answers={answers.sort((a, b) => a.question.order - b.question.order)}
        />
      ) : (
        <InfoBar infoBar={testInfoBar} />
      )} */}
      {analyzes.length ? (
        <AnalyzesCard
          analyzeTypes={analyzeTypes}
          onAddAnalyzeClick={addAnalyzeOpen}
          analyzes={analyzes}
          onShowMoreClick={onShowMoreClick}
          isShowMore={isShowMore}
        />
      ) : (
        <InfoBar infoBar={analyzesInfoBar} />
      )}
    </div>
  );
};
