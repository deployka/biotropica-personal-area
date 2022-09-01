import React, { useEffect, useState } from 'react';

import { Progress } from '../components/Progress/Progress';
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

import { Analyzes } from '../../../components/Analyzes/Analyzes';
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

import payImg from '../../../assets/icons/transaction.svg';
import lockImg from '../../../assets/icons/lock.svg';
import unlockImg from '../../../assets/icons/unlock.svg';

import { useGetInvoiceByProductUuidQuery } from '../../../api/invoice';
import Modal from '../../../shared/Global/Modal/Modal';
import { useUploadFileMutation } from '../../../api/files';
import { ClientProfileLayout } from '../../../components/ProfileLayout/Client/Client';

import s from './Profile.module.scss';

interface Props {
  user: BaseUser;
}

const Profile = ({ user }: Props) => {
  const { openModal, closeModal } = useModal();
  const [isAnalyzeModalOpen, setIsAnalyzeModalOpen] = useState(false);
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
  const { data: questionnaireAnswers = [] } = useGetQuestionnaireAnswersQuery(
    user.id,
  );
  const { data: analyzeTypes = [], isLoading: isAnalyzesTypesLoading = false } =
    useGetAnalyzesQuery();
  const { data: analyzes = [], isLoading: isAnalyzesLoading = false } =
    useGetAnalyzeAnswersQuery({
      userId: user.id,
    });
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
      setIsAnalyzeModalOpen(false);
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
      setIsAnalyzeModalOpen(false);
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
            <>
              {isAnalyzesAccess && (
                <Analyzes
                  isAnalyzesLoading={
                    isAnalyzesTypesLoading || isAnalyzesLoading
                  }
                  onAddAnalyze={handleSubmitAnalyzes}
                  isAddAnalyzeLoading={isCreateAnalyzeAnswerLoading}
                  isModalOpen={isAnalyzeModalOpen}
                  setIsModalOpen={setIsAnalyzeModalOpen}
                  analyzes={analyzes}
                  analyzeTypes={analyzeTypes}
                  onDeleteAnalyze={id => {
                    handleDeleteAnalyze({ id });
                  }}
                />
              )}
              {!isAnalyzesAccess && 'Приобретите тариф, что получить доступ'}
            </>
          )}
          {activeTab === tabs[1].key && (
            <QuestionnaireTab
              isAccess={isAnalyzesAccess}
              isPublic={false}
              answers={questionnaireAnswers}
            />
          )}
          {isProgressAccess && (
            <>
              {activeTab === tabs[2].key && (
                <button
                  onClick={openProgressModal}
                  className={s.btn__add__photo}
                >
                  добавить фото
                </button>
              )}
              {activeTab === tabs[2].key && <Progress user={user} />}
            </>
          )}
          {activeTab === tabs[2].key &&
            !isProgressAccess &&
            'Приобретите тариф, что получить доступ'}
        </div>
      </ClientProfileLayout>
    </>
  );
};

export default Profile;
