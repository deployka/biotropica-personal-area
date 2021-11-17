import { User } from '../../../../store/ducks/user/contracts/state';
import { TestsCard } from './TestsCard/TestsCard';
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
import { useEffect, useState } from 'react';
import { LoadingStatus } from '../../../../store/types';
import { store } from 'react-notifications-component';
import { notification } from '../../../../config/notification/notificationForm';
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

interface Props {
  user: User;
}

export interface Tests {
  info: string;
  fileName: string;
  link: string;
  createdAt: string;
}

export const TestsAndAnalyze = ({}: Props) => {
  const { openModal, closeModal } = useModal();

  const tests = {
    age: '20',
    plans: 'бегу, плаванию',
    asthma: 'нет',
    diabetes: 'нет',
    updateUrl: 'upd8271389',
  };

  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectAnalyzeLoadingStatus);
  const response = useSelector(selectAnalyzeResponse);
  const offsetData = useSelector(selectAnalyzesResponse);

  const [analyzeTypes, setAnalyzeTypes] = useState<Analyze[]>([]);
  const [isShowMore, setIsShowMore] = useState(true);

  const analyzes: AnalyzeAnswer[] = useSelector(selectAnalyzesData);
  const offset: number = analyzes.length;

  function fetchAnalyzesByLimitAndOffset(offset: number, limit?: number) {
    dispatch(fetchAnalyzesData(offset, limit));
  }

  useEffect(() => {
    dispatch(fetchAnalyzesData());
  }, []);

  useEffect(() => {
    if (analyzes.length && !offsetData && isShowMore) {
      setIsShowMore(false);
    }
  }, [offsetData]);

  useEffect(() => {
    function fetchAllTypes() {
      AnalyzeService.geAllTypes().then(({ data }) => setAnalyzeTypes(data));
    }
    fetchAllTypes();
  }, []);

  useEffect(() => {
    if (!response) return;
    switch (loadingStatus) {
      case LoadingStatus.ERROR:
        store.addNotification({
          ...notification,
          title: 'Произошла ошибка!',
          message: response?.message || 'Произошла непредвиденная ошибка!',
          type: 'danger',
        });
        break;
      case LoadingStatus.SUCCESS:
        store.addNotification({
          ...notification,
          title: 'Успешно!',
          message: response?.message || 'Анализ успешно загружен!',
          type: 'success',
        });
        closeModal(ModalName.MODAL_ADD_ANALYZ_FILE);
        dispatch(fetchAnalyzesData());
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
      store.addNotification({
        ...notification,
        title: 'Ошибка!',
        message: 'Произошла непредвиденная ошибка!',
        type: 'danger',
        dismiss: {
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
        store.addNotification({
          ...notification,
          title: 'Файл не был загружен!',
          message: 'Допустимые типы анализов: pdf',
          type: 'danger',
          id: 'file_type_error',
          dismiss: {
            duration: 7000,
            onScreen: true,
          },
        });
      },
      onSuccessFileLoaded: () => store.removeNotification('file_type_error'),
    });
  }

  const testInfoBar: IInfoBar = {
    title: 'Вы не заполняли анкету',
    text: 'Пожалуйста, заполните анкету',
    href: 'test',
    bottomLink: 'Заполнить анкету',
  };

  const analyzesInfoBar: IInfoBar = {
    title: 'Вы не добавляли анализы',
    text: 'У вас нет загруженных анализов.',
    bottomLink: 'Загрузить анализы',
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
      {/* TODO: оставлено для задачи с анкетой */}
      {tests.age ? (
        <TestsCard tests={tests} />
      ) : (
        <InfoBar infoBar={testInfoBar} />
      )}
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
