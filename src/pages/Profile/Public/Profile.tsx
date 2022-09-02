import React, { useEffect, useState } from 'react';

import { useModal } from '../../../hooks/useModal';
import { ModalName } from '../../../providers/ModalProvider';
import { useHistory, useParams } from 'react-router';
import { Param } from '../Edit/Edit';
import { Tab, Tabs } from '../../../shared/Global/Tabs/Tabs';
import { getTabByKey } from '../../../utils/tabsHelper';
import { useGetGoalsQuery } from '../../../api/goals';
import { BaseUser } from '../../../@types/entities/BaseUser';
import { QuestionnaireTab } from '../../../components/QuestionnaireTab/QuestionnaireTab';
import { useGetQuestionnaireAnswersQuery } from '../../../api/user';

import { AnalyzesTab } from '../../../components/AnalyzesTab/AnalyzesTab';
import { CreateAnalyzeAnswerDto } from '../../../@types/dto/analyzes/create.dto';
import {
  useCreateAnalyzeAnswerMutation,
  useDeleteAnalyzeAnswerMutation,
  useGetAnalyzeAnswersQuery,
} from '../../../api/analyze-answers';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { useGetAnalyzesQuery } from '../../../api/analyzes';
import { useGetCurrentTariffQuery } from '../../../api/tariffs';
import { useSelector } from 'react-redux';
import { selectCurrentTariffAccesses } from '../../../store/slices/tariff';
import { DeleteAnalyzeAnswerDto } from '../../../@types/dto/analyzes/delete.dto';

import Modal from '../../../shared/Global/Modal/Modal';
import { useGetInvoiceByProductUuidQuery } from '../../../api/invoice';
import {
  useUploadFileMutation,
  useUploadFilesMutation,
} from '../../../api/files';
import { ClientProfileLayout } from '../../../components/ProfileLayout/Client/Client';
import { ProgressTab } from '../../../components/ProgressTab/ProgressTab';

import {
  useCreateProgressPostMutation,
  useDeleteProgressPostMutation,
  useGetProgressPostsQuery,
} from '../../../api/progress';
import { DeleteProgressPostDto } from '../../../@types/dto/progress/delete.dto';
import { ProgressTabNotificationButtons } from '../../../components/ProgressTab/NotificationButtons/NotificationButtons';

import lockImg from '../../../assets/icons/lock.svg';
import unlockImg from '../../../assets/icons/unlock.svg';
import s from './Profile.module.scss';
import { ProgressPhotoType } from '../../../@types/entities/Progress';
import { CreateProgressDto } from '../../../@types/dto/progress/create.dto';
import { ResponseError } from '../../../@types/api/response';
import { Files } from '../../../components/ProgressTab/AddPhotoModal/AddPhotoModal';
import { FormikHelpers } from 'formik';
interface Props {
  user: BaseUser;
}

const Profile = ({ user }: Props) => {
  const { openModal, closeModal } = useModal();
  const [paymentForm, setPaymentForm] = useState('');

  const { data: goals = [] } = useGetGoalsQuery();

  const { active } = useParams<Param>();

  const history = useHistory();
  const { data: currentTariff } = useGetCurrentTariffQuery();

  const tariffAccesses = useSelector(selectCurrentTariffAccesses);

  const isAnalyzesAccess = tariffAccesses.length
    ? tariffAccesses.some(it => it === 'ANALYZES')
    : false;

  const isProgressAccess = tariffAccesses.length
    ? tariffAccesses.some(it => it === 'PROGRESS')
    : false;

  const tabs: Tab[] = [
    {
      key: 'analyzes',
      value: (
        <>
          Анализы &nbsp;
          <img
            className={s.lock}
            src={isAnalyzesAccess ? unlockImg : lockImg}
          />
        </>
      ),
    },
    {
      key: 'questionnaire',
      value: (
        <>
          Тестирование &nbsp;
          <img
            className={s.lock}
            src={isProgressAccess ? unlockImg : lockImg}
          />
        </>
      ),
    },
    {
      key: 'progress',
      value: (
        <>
          Прогресс &nbsp;
          <img
            className={s.lock}
            src={isAnalyzesAccess ? unlockImg : lockImg}
          />
        </>
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState(
    getTabByKey(active, tabs)?.key || tabs[0].key,
  );
  const [uploadFile] = useUploadFileMutation();
  const [createAnalyzeAnswer, { isLoading: isCreateAnalyzeAnswerLoading }] =
    useCreateAnalyzeAnswerMutation();
  const [deleteAnalyzeAnswer] = useDeleteAnalyzeAnswerMutation();
  const [deleteProgressPost] = useDeleteProgressPostMutation();
  const [fetchUploadFiles, { isLoading: isFilesLoading }] =
    useUploadFilesMutation();
  const [createProgress, { isLoading: isCreateProgressLoading }] =
    useCreateProgressPostMutation();
  const {
    data: questionnaireAnswers = [],
    isLoading: isQuestionnaireAnswersLoading,
  } = useGetQuestionnaireAnswersQuery(user.id, {
    skip: activeTab !== tabs[1].key,
  });
  const { data: analyzeTypes = [], isLoading: isAnalyzesTypesLoading = false } =
    useGetAnalyzesQuery(undefined, { skip: activeTab !== tabs[0].key });
  const { data: progressPosts = [], isLoading: isProgressLoading } =
    useGetProgressPostsQuery({
      userId: user.id,
    });
  const { data: analyzes = [], isLoading: isAnalyzesLoading = false } =
    useGetAnalyzeAnswersQuery(
      {
        userId: user.id,
      },
      { skip: activeTab !== tabs[0].key },
    );

  const { data: invoice } = useGetInvoiceByProductUuidQuery(
    currentTariff?.uuid || '',
    {
      skip: !currentTariff?.uuid,
    },
  );

  function onTabClick(tab: Tab) {
    history.push(`/profile/tabs/${tab.key}`);
  }

  function openProgressModal() {
    openModal(ModalName.MODAL_ADD_PROGRESS_PHOTO, { user });
  }

  const handleSubmitAnalyzes = async (values: CreateAnalyzeAnswerDto) => {
    try {
      if (!values.filePath) throw new Error('Файл отсутствует');
      const loadedFileData = await uploadFile({
        file: values.filePath,
      }).unwrap();

      if (!loadedFileData) throw new Error('Файл не загружен');
      await createAnalyzeAnswer({
        text: values.text,
        filePath: loadedFileData.name,
      }).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Анализ успешно загружен',
        type: NotificationType.SUCCESS,
        autoClose: 10000,
      });
    } catch (error) {
      console.error(error);
      eventBus.emit(EventTypes.notification, {
        title: 'Ошибка!',
        message: 'Произошла непредвиденная ошибка!',
        type: NotificationType.DANGER,
        autoClose: 10000,
      });
    }
  };

  const handleDeleteAnalyze = async (values: DeleteAnalyzeAnswerDto) => {
    try {
      await deleteAnalyzeAnswer(values).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Анализ удален',
        type: NotificationType.SUCCESS,
        autoClose: 10000,
      });
    } catch (error) {
      console.error(error);
      eventBus.emit(EventTypes.notification, {
        title: 'Ошибка!',
        message: 'Произошла непредвиденная ошибка!',
        type: NotificationType.DANGER,
        autoClose: 10000,
      });
    }
  };

  useEffect(() => {
    if (active) {
      setActiveTab(getTabByKey(active, tabs)?.key || activeTab);
      history.push(
        `/profile/tabs/${getTabByKey(active, tabs)?.key || activeTab}`,
      );
    }
  }, [active]);

  const onBuyTariffClick = () => {
    history.push('/tariffs');
  };

  const onPayTariffClick = () => {
    setPaymentForm(invoice?.paymentForm || '');
  };

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

  const onEditClick = () => {
    history.push('/profile/edit');
  };

  return (
    <>
      <Modal
        isOpened={!!paymentForm}
        close={() => {
          setPaymentForm('');
        }}
      >
        <div>
          <p style={{ marginBottom: '15px' }}>Выберете способ оплаты:</p>
          <div dangerouslySetInnerHTML={{ __html: paymentForm }} />
        </div>
      </Modal>

      <ClientProfileLayout
        isPublic={false}
        user={user}
        goalsCount={goals.length}
        currentTariff={currentTariff}
        onEditClick={onEditClick}
        onClickBuyTariff={onBuyTariffClick}
        onClickPayTariff={onPayTariffClick}
      >
        <div className={s.content}>
          <div className={s.tabs__container}>
            <div className={s.horizontalScroll}>
              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onActiveTabChanged={setActiveTab}
                spaceBetween={50}
                onTabClick={onTabClick}
              />
            </div>
          </div>
          {activeTab === tabs[0].key && (
            <AnalyzesTab
              isAccess={isAnalyzesAccess}
              isEditable={true}
              isAnalyzesLoading={isAnalyzesTypesLoading || isAnalyzesLoading}
              onAddAnalyze={handleSubmitAnalyzes}
              isAddAnalyzeLoading={isCreateAnalyzeAnswerLoading}
              analyzes={analyzes}
              analyzeTypes={analyzeTypes}
              onDeleteAnalyze={id => {
                handleDeleteAnalyze({ id });
              }}
            />
          )}
          {activeTab === tabs[1].key && (
            <QuestionnaireTab
              isAccess={isAnalyzesAccess}
              isLoading={isQuestionnaireAnswersLoading}
              isPublic={false}
              answers={questionnaireAnswers}
            />
          )}
          {activeTab === tabs[2].key && (
            <ProgressTab
              isAccess={isProgressAccess}
              isLoading={isProgressLoading}
              progressPosts={progressPosts}
              onCreatePost={onCreateProgressPost}
              onDeletePost={clickDeleteProgress}
            />
          )}
        </div>
      </ClientProfileLayout>
    </>
  );
};

export default Profile;
