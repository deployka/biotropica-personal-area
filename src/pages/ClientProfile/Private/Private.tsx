import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';

import type { BaseUser } from '../../../@types/entities/BaseUser';

import { createCookie, readCookie } from '../../../utils/cookie';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { Tab } from '../../../shared/Global/Tabs/Tabs';
import { getTabByKey } from '../../../utils/tabsHelper';
import { useGetGoalsQuery } from '../../../api/goals';
import { useGetCurrentTariffQuery } from '../../../api/tariffs';
import { useGetInvoiceByProductUuidQuery } from '../../../api/invoice';
import { selectCurrentTariffAccesses } from '../../../store/slices/tariff';
import Modal from '../../../shared/Global/Modal/Modal';
import { ClientProfileLayout } from '../../../components/ProfileLayout/Client/Client';
import { Analyzes } from './Analyzes';
import { Questionnaire } from './Questionnaire';
import { Progress } from './Progress';

import lockImg from '../../../assets/icons/lock.svg';
import unlockImg from '../../../assets/icons/unlock.svg';

import s from './Private.module.scss';

type Props = {
  user: BaseUser;
};

const ClientProfilePrivate = ({ user }: Props) => {
  const history = useHistory();
  const { active } = useParams<{ active: string }>();
  const SEVEN_DAY = 604800;

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
    if (!currentTariff?.tariff?.title) return history.push('/tariffs');
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
      value: (
        <>
          Тестирование &nbsp;
          <img
            className={s.lock}
            src={isAnalyzesAccess ? unlockImg : lockImg}
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

  useEffect(() => {

    const blogDateView = Number(readCookie('blog_date_view'));
    if (blogDateView + SEVEN_DAY > Date.now()) {
      return;
    }

    if (!blogDateView) {
      createCookie('blog_date_view', Date.now().toString(), 365);
    }

    eventBus.emit(EventTypes.notification, {
      message: (
        <div>
          Не забудьте заглянуть в наш блог, где собраны лучшие статьи от специалистов BioTropica
          <button
            style={{ marginLeft: '10px' }}
            onClick={() => goToBlog()}
          >
            Перейти
          </button>
        </div>
      ),
      type: NotificationType.INFO,
    });
  }, []);

  function goToBlog(){
    document.location = 'https://biotropika.ru/blog/';
  }

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
        tabs={tabs}
        activeTab={activeTab}
        onActiveTabChange={handleChangeTab}
      >
        <div className={s.content}>
          {activeTab === tabs[0].key && (
            <Analyzes userId={user.id} isAccess={isAnalyzesAccess} />
          )}
          {activeTab === tabs[1].key && (
            <Questionnaire userId={user.id} isAccess={isAnalyzesAccess} />
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
