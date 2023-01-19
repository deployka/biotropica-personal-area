import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import type { BaseUser } from '../../../@types/entities/BaseUser';

import { createCookie, readCookie } from '../../../utils/cookie';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { getTabByKey } from '../../../utils/tabsHelper';
import { useGetGoalsQuery } from '../../../api/goals';
import { ClientProfileLayout } from '../../../components/ProfileLayout/Client/Client';
import { Analyzes } from './Analyzes';
import { Questionnaire } from './Questionnaire';
import { Progress } from './Progress';
import { useGetFollowedSpecialistsQuery } from '../../../api/user';
import { SpecialistListTab } from '../../../components/SpecialistListTab/Tab';

import s from './Private.module.scss';
import { SEVEN_DAYS, tabs } from './constants';

type Props = {
  user: BaseUser;
};

const ClientProfilePrivate = ({ user }: Props) => {
  const history = useHistory();
  const { active } = useParams<{ active: string }>();

  const { data: goals = [], isLoading: isGoalsLoading } = useGetGoalsQuery();

  // Тарифы скрыты
  // const { data: currentTariff } = useGetCurrentTariffQuery();
  // const onBuyTariffClick = () => {
  //   return history.push('/tariffs');
  // };
  const onEditClick = () => {
    history.push('/profile/edit');
  };

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
//
  // function goToBlog() {
  //   document.location = 'https://biotropika.ru/blog';
  // }

  useEffect(() => {
    const blogDateView = Number(readCookie('blog_date_view'));
    if (blogDateView + SEVEN_DAYS > Date.now()) {
      return;
    }

    if (!blogDateView) {
      createCookie('blog_date_view', Date.now().toString(), 365);
    }

    // eventBus.emit(EventTypes.notification, {
    //   message: (
    //     <div>
    //       Не забудьте заглянуть в наш блог, где собраны лучшие статьи от
    //       специалистов BioTropika
    //       <button style={{ marginLeft: '10px' }} onClick={goToBlog}>
    //         Перейти
    //       </button>
    //     </div>
    //   ),
    //   type: NotificationType.INFO,
    // });
  }, []);

  const currentUserId = user?.id || 0;
  const {
    data: users = [],
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetFollowedSpecialistsQuery(
    { id: currentUserId },
    { skip: !currentUserId || activeTab !== tabs[2].key },
  );

  return (
    <>
      <ClientProfileLayout
        isPublic={false}
        user={user}
        isGoalsLoading={isGoalsLoading}
        goalsCount={goals.length}
        tabs={tabs}
        activeTab={activeTab}
        onActiveTabChange={handleChangeTab}
      >
        <div className={s.content}>
          {/* {activeTab === tabs[0].key && (
            <Analyzes userId={user.id} isAccess={true} />
          )} */}
          {activeTab === tabs[0].key && (
            <Questionnaire userId={user.id} isAccess={true} />
          )}
          {activeTab === tabs[1].key && (
            <Progress userId={user.id} isAccess={true} />
          )}
          {activeTab === tabs[2].key && (
            <SpecialistListTab
              isLoading={isUsersLoading}
              isError={isUsersError}
              users={users}
            />
          )}
        </div>
      </ClientProfileLayout>
    </>
  );
};

export default ClientProfilePrivate;
