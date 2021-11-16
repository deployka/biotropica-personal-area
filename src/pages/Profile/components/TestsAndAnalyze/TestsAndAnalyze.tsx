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
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
import { selectAnalyzesData } from '../../../../store/ducks/analyzes/selectors';
import { fetchAnalyzesData } from '../../../../store/ducks/analyzes/actionCreators';
import AnalyzeService from '../../../../services/AnalyzeService';

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

  const [file, setFile] = useState<ArrayBuffer | string | null>(null);
  const [analyzeTypes, setAnalyzeTypes] = useState<Analyze[]>([]);

  const analyzes: AnalyzeAnswer[] | [] = useSelector(selectAnalyzesData);
  const [limit, setLimit] = useState(2);

  useEffect(() => {
    dispatch(fetchAnalyzesData(limit));
  }, [limit]);

  useEffect(() => {
    async function fetchAllTypes() {
      const { data } = await AnalyzeService.geAllTypes();
      setAnalyzeTypes(data);
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
        dispatch(fetchAnalyzesData(limit));
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

  function onFileLoaded(
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ): File | null {
    const tgt = e.target;
    const files = tgt.files;
    const permittedPaths = ['application/pdf'];

    if (
      FileReader &&
      files &&
      files.length &&
      permittedPaths.includes(files?.[0]?.type)
    ) {
      store.removeNotification('file_type_error');
      const fr = new FileReader();
      fr.onload = function () {
        setFieldValue('filePath', files[0]);
        setFile(fr.result);
      };
      fr.readAsDataURL(files[0]);
      return files[0];
    } else {
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
    }
    return null;
  }

  function addAnalyzeOpen() {
    return openModal(ModalName.MODAL_ADD_ANALYZ_FILE, {
      onSubmit,
      onFileLoaded,
      validationSchema,
      file,
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

  function getShowMore() {
    if (analyzes.length === limit) {
      return false;
    }
    return true;
  }

  function onShowMoreClick(
    setShowMore: Dispatch<SetStateAction<boolean>>,
    showMore: boolean
  ) {
    setShowMore(getShowMore());
    if (showMore) {
      setShowMore(false);
      return setLimit(2);
    }
    setLimit(limit + 3);
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
        />
      ) : (
        <InfoBar infoBar={analyzesInfoBar} />
      )}
    </div>
  );
};
