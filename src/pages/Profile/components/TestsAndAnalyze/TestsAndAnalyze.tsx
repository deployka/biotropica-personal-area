import React, { useEffect, useState } from 'react';
import s from './TestsAndAnalyze.module.scss';
import { AnalyzesCard } from './AnalyzesCard/AnalyzesCard';
import { IInfoBar, InfoBar } from '../../../../shared/Global/InfoBar/InfoBar';
import { ModalName } from '../../../../providers/ModalProvider';
import { useModal } from '../../../../hooks/UseModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAnalyzeLoadingStatus,
  selectAnalyzeResponse,
} from '../../../../store/ducks/analyze/selectors';

import { LoadingStatus } from '../../../../store/types';
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

interface Props {
  user: User;
  isPublic?: boolean;
}

export const TestsAndAnalyze = ({ user, isPublic }: Props) => {
  const { openModal, closeModal } = useModal();
  const [answers, setAnswers] = useState<Answer[]>([]);

  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectAnalyzeLoadingStatus);
  const response = useSelector(selectAnalyzeResponse);
  const offsetData = useSelector(selectAnalyzesResponse);

  const [analyzeTypes, setAnalyzeTypes] = useState<Analyze[]>([]);
  const [isShowMore, setIsShowMore] = useState(true);

  const analyzes: AnalyzeAnswer[] = useSelector(selectAnalyzesData);
  const offset: number = analyzes.length;

  function fetchAnalyzesByLimitAndOffset(offset: number, limit?: number) {
    dispatch(fetchAnalyzesData(user.id, offset, limit));
  }

  useEffect(() => {
    dispatch(fetchAnalyzesData(user.id));
    const fetchAnswers = () => {
      UserService.answers(user.id).then(({ data }) => setAnswers(data));
    };
    function fetchAllTypes() {
      AnalyzeService.geAllTypes().then(({ data }) => setAnalyzeTypes(data));
    }
    fetchAllTypes();
    fetchAnswers();
  }, []);

  useEffect(() => {
    if (analyzes.length && !offsetData && isShowMore) {
      setIsShowMore(false);
    }
  }, [offsetData]);

  useEffect(() => {
    if (!response) return;
    switch (loadingStatus) {
      case LoadingStatus.ERROR:
        break;
      case LoadingStatus.SUCCESS:
        eventBus.emit(EventTypes.notification, {
          title: 'Успешно!',
          message: response?.message || 'Анализ успешно загружен!',
          type: NotificationType.SUCCESS,
        });
        closeModal(ModalName.MODAL_ADD_ANALYZ_FILE);
        dispatch(fetchAnalyzesData(user.id));
        setIsShowMore(true);
        dispatch(setAnalyzeResponse(undefined));
        break;
      default:
        break;
    }
  }, [loadingStatus, response]);

  async function onSubmit(values: CreateAnalyzeAnswerData) {
    try {
      dispatch(setAnalyzeLoadingStatus(LoadingStatus.LOADING));
      if (values.filePath instanceof File) {
        const res = await FileService.upload(values.filePath);
        values.filePath = res.data.name;
      }
      dispatch(createAnalyzeAnswerData(values));
    } catch (error) {
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
  }

  function addAnalyzeOpen() {
    return openModal(ModalName.MODAL_ADD_ANALYZ_FILE, {
      onSubmit,
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
  }

  const testInfoBar: IInfoBar = {
    title: !isPublic
      ? 'Пользователь не заполнял анкету'
      : 'Вы не заполняли анкету',
    text: !isPublic ? '' : 'Пожалуйста, заполните анкету',
    href: '/questionnaire',
    bottomLink: !isPublic ? '' : 'Заполнить анкету',
  };

  const analyzesInfoBar: IInfoBar = {
    title: !isPublic
      ? 'Пользователь не добавлял анализы'
      : 'Вы не добавляли анализы',
    text: !isPublic ? '' : 'У вас нет загруженных анализов.',
    bottomLink: !isPublic ? '' : 'Загрузить анализы',
    onClick: () => {
      addAnalyzeOpen();
    },
  };

  function onShowMoreClick() {
    if (!offsetData && !isShowMore) {
      dispatch(setAnalyzesData(analyzes.filter((_, i) => i < MIN_LIMIT)));
      setIsShowMore(true);
    } else {
      fetchAnalyzesByLimitAndOffset(offset, NEXT_FETCH_LIMIT);
    }
  }

  return (
    <div className={s.tests__and__analyze}>
      {answers.length
        ? (
          <Questionnaire
            answers={answers.sort((a, b) => a.question.order - b.question.order)}
          />
        )
        : (
          <InfoBar infoBar={testInfoBar} />
        )}
      {analyzes.length
        ? (
          <AnalyzesCard
            analyzeTypes={analyzeTypes}
            onAddAnalyzeClick={addAnalyzeOpen}
            analyzes={analyzes}
            onShowMoreClick={onShowMoreClick}
            isShowMore={isShowMore}
          />
        )
        : (
          <InfoBar infoBar={analyzesInfoBar} />
        )}
    </div>
  );
};
