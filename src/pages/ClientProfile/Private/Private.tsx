import React, { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router';
import { Tab, Tabs } from '../../../shared/Global/Tabs/Tabs';
import { getTabByKey } from '../../../utils/tabsHelper';
import { useGetGoalsQuery } from '../../../api/goals';
import { BaseUser } from '../../../@types/entities/BaseUser';
import { useGetQuestionnaireAnswersQuery } from '../../../api/user';

import { eventBus, EventTypes } from '../../../services/EventBus';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { useGetCurrentTariffQuery } from '../../../api/tariffs';
import { useSelector } from 'react-redux';
import { selectCurrentTariffAccesses } from '../../../store/slices/tariff';

import lockImg from '../../../assets/icons/lock.svg';
import unlockImg from '../../../assets/icons/unlock.svg';

import Modal from '../../../shared/Global/Modal/Modal';
import { useGetInvoiceByProductUuidQuery } from '../../../api/invoice';
import { useUploadFilesMutation } from '../../../api/files';
import { ClientProfileLayout } from '../../../components/ProfileLayout/Client/Client';

import {
  useCreateProgressPostMutation,
  useDeleteProgressPostMutation,
  useGetProgressPostsQuery,
} from '../../../api/progress';
import { DeleteProgressPostDto } from '../../../@types/dto/progress/delete.dto';
import { ProgressTabNotificationButtons } from '../../../components/ProgressTab/NotificationButtons/NotificationButtons';

import { ProgressPhotoType } from '../../../@types/entities/Progress';
import { CreateProgressDto } from '../../../@types/dto/progress/create.dto';
import { ResponseError } from '../../../@types/api/response';
import { Files } from '../../../components/ProgressTab/AddPhotoModal/AddPhotoModal';
import { FormikHelpers } from 'formik';

import s from './Private.module.scss';
import { Analyzes } from './Analyzes';
import { ProgressTab } from '../../../components/ProgressTab/ProgressTab';
import { QuestionnaireTab } from '../../../components/QuestionnaireTab/QuestionnaireTab';
import { Questionnaire } from './Questionnaire';
import { Progress } from './Progress';

type Props = {
  user: BaseUser;
};

const ClientProfilePrivate = ({ user }: Props) => {
  const history = useHistory();
  const { active } = useParams<{ active: string }>();

  const tariffAccesses = useSelector(selectCurrentTariffAccesses);

  const isAnalyzesAccess = tariffAccesses.length
    ? tariffAccesses.some(it => it === 'ANALYZES')
    : false;

  const isProgressAccess = tariffAccesses.length
    ? tariffAccesses.some(it => it === 'PROGRESS')
    : false;

  const [paymentForm, setPaymentForm] = useState('');

  const { data: goals = [], isLoading: isGoalsLoading } = useGetGoalsQuery();

  const { data: currentTariff } = useGetCurrentTariffQuery();

  const { data: invoice } = useGetInvoiceByProductUuidQuery(
    currentTariff?.uuid || '',
    {
      skip: !currentTariff?.uuid,
    },
  );

  const onBuyTariffClick = () => {
    history.push('/tariffs');
  };

  const onPayTariffClick = () => {
    setPaymentForm(invoice?.paymentForm || '');
  };

  const onEditClick = () => {
    history.push('/profile/edit');
  };

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
      value: 'Тестирование',
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

  const handleChangeTab = (tab: string) => {
    setActiveTab(tab);
    history.push(`/profile/tabs/${tab}`);
  };

  useEffect(() => {
    if (active) {
      setActiveTab(getTabByKey(active, tabs)?.key || activeTab);
      history.push(
        `/profile/tabs/${getTabByKey(active, tabs)?.key || activeTab}`,
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
        isPublic={false}
        user={user}
        isGoalsLoading={isGoalsLoading}
        goalsCount={goals.length}
        currentTariff={currentTariff}
        onEditClick={onEditClick}
        onClickBuyTariff={onBuyTariffClick}
        onClickPayTariff={onPayTariffClick}
        tabs={tabs}
        activeTab={activeTab}
        onActiveTabChange={handleChangeTab}
      >
        <div className={s.content}>
          {activeTab === tabs[0].key && (
            <Analyzes userId={user.id} isAccess={isAnalyzesAccess} />
          )}
          {activeTab === tabs[1].key && (
            <Questionnaire userId={user.id} isAccess={true} />
          )}
          {activeTab === tabs[2].key && (
            <Progress userId={user.id} isAccess={isProgressAccess} />
          )}
        </div>
      </ClientProfileLayout>
    </>
  );
};

export default ClientProfilePrivate;
