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
import s from './Public.module.scss';
import { ProgressPhotoType } from '../../../@types/entities/Progress';
import { CreateProgressDto } from '../../../@types/dto/progress/create.dto';
import { ResponseError } from '../../../@types/api/response';
import { Files } from '../../../components/ProgressTab/AddPhotoModal/AddPhotoModal';
import { FormikHelpers } from 'formik';
import { ProgressTabPublic } from '../../../components/ProgressTab/ProgressTabPublic';
import { CurrentTariff } from '../../../@types/entities/Tariff';

type Props = {
  user: BaseUser;
};

const tabs: Tab[] = [
  {
    key: 'analyzes',
    value: 'Анализы',
  },
  {
    key: 'questionnaire',
    value: 'Тестирование',
  },
  {
    key: 'progress',
    value: 'Прогресс',
  },
];

const ClientProfilePublic = ({ user }: Props) => {
  const [paymentForm, setPaymentForm] = useState('');

  const { data: goals = [] } = useGetGoalsQuery();

  const { active } = useParams<Param>();

  const history = useHistory();

  const [activeTab, setActiveTab] = useState(
    getTabByKey(active, tabs)?.key || tabs[0].key,
  );

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

  function onTabClick(tab: Tab) {
    history.push(`/users/${user.id}/tabs/${tab.key}`);
  }

  useEffect(() => {
    if (active) {
      setActiveTab(getTabByKey(active, tabs)?.key || activeTab);
      history.push(
        `/users/${user.id}/tabs/${getTabByKey(active, tabs)?.key || activeTab}`,
      );
    }
  }, [active]);

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
        isPublic={true}
        user={user}
        goalsCount={goals.length}
        currentTariff={undefined}
        tabs={[]}
        activeTab={''}
        onActiveTabChange={function (tabKey: string): void {
          throw new Error('Function not implemented.');
        }}
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
          {/* {activeTab === tabs[0].key && (
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
          )} */}
          {activeTab === tabs[1].key && (
            <QuestionnaireTab
              isAccess={true}
              isLoading={isQuestionnaireAnswersLoading}
              isPublic={false}
              answers={questionnaireAnswers}
            />
          )}
          {activeTab === tabs[2].key && (
            <ProgressTabPublic
              isLoading={isProgressLoading}
              progressPosts={progressPosts}
            />
          )}
        </div>
      </ClientProfileLayout>
    </>
  );
};

export default ClientProfilePublic;
