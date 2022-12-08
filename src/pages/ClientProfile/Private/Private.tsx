import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';

import type { BaseUser } from '../../../@types/entities/BaseUser';

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
    return history.push('/tariffs');
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
