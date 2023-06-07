import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';

import type { BaseUser } from '../../../@types/entities/BaseUser';

import { createCookie, readCookie } from '../../../utils/cookie';
import { getTabByKey } from '../../../utils/tabsHelper';
import { useGetGoalsQuery } from '../../../api/goals';
import { ClientProfileLayout } from '../../../components/ProfileLayout/Client/Client';
import { Analyzes } from './Analyzes';
import { Questionnaire } from './Questionnaire';
import { Progress } from './Progress';
import { SpecialistListTab } from '../../../components/SpecialistListTab/Tab';

import s from './Private.module.scss';
import { SEVEN_DAYS, tabs } from './constants';
import { SubscribersListTab } from '../../../components/SubscribersListTab/SubscribersListTab';
import { SubscribeStatus } from '../../../@types/dto/subscribers/update-subscriber.dto';
import { Subscribe } from '../../../@types/entities/Subscribe';
import { useCurrentUserSubscribersMutation, useRemoveSubscribByIdMutation, useUpdateSubscribByIdMutation } from '../../../api/subscribers';

type Props = {
  user: BaseUser;
};

const ClientProfilePrivate = ({ user }: Props) => {
  const history = useHistory();
  const { active } = useParams<{ active: string }>();

  const [activeTab, setActiveTab] = useState(
    getTabByKey(active, tabs)?.key || tabs[0].key,
  );

  const [updateSubscribes] = useUpdateSubscribByIdMutation();
  const [removeSubscribe] = useRemoveSubscribByIdMutation();

  const { data: goals = [], isLoading: isGoalsLoading } = useGetGoalsQuery();

  const [getUserSubscribers] = useCurrentUserSubscribersMutation();

  const [subscribes, setSubscribes] = useState<Subscribe[]>([]);

  useEffect(() => {
    getUserSubscribers()
      .then(({ data }: any) => {
        if (data) {
          setSubscribes(data);
        }
      })
      .catch(e => console.log(e));
  }, [getUserSubscribers, active]);

  const specialists = useMemo(() => {
    const activeSubscribers = subscribes?.filter((s: Subscribe) => s.status === SubscribeStatus.SUBSCRIBE);
    return activeSubscribers?.map(s => ({
      user: s.specialist?.user,
      subscribeId: s.id,
    }));
  }, [subscribes]);

  // Тарифы скрыты
  // const { data: currentTariff } = useGetCurrentTariffQuery();
  // const onBuyTariffClick = () => {
  //   return history.push('/tariffs');
  // };
  const onEditClick = () => {
    history.push('/profile/edit');
  };

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

  const changeStatusHandler = useCallback((id: number, status: SubscribeStatus) => {
    const newSubscribes = [...subscribes];
    const idx = newSubscribes.findIndex(s => s.id === id);
    newSubscribes[idx] = {
      ...newSubscribes[idx],
      status,
    };
    setSubscribes(newSubscribes);
  }, [subscribes]);

  const handleRejectClick = useCallback(async (id: number) => {
    await updateSubscribes({ id, status: SubscribeStatus.BLOCKED });
    changeStatusHandler(id, SubscribeStatus.BLOCKED);
  }, [changeStatusHandler, updateSubscribes]);

  const handleApplyClick = useCallback(async (id: number) => {
    await updateSubscribes({ id, status: SubscribeStatus.SUBSCRIBE });
    changeStatusHandler(id, SubscribeStatus.SUBSCRIBE);
  }, [changeStatusHandler, updateSubscribes]);

  const handleRemoveClick = useCallback(async (id: number) => {
    await updateSubscribes({ id, status: SubscribeStatus.REJECTED });
    await removeSubscribe(id);
    const newArray = subscribes.filter(s => s.id !== id);
    setSubscribes(newArray);
  }, [removeSubscribe, subscribes, updateSubscribes]);

  // const currentUserId = user?.id || 0;
  // const {
  //   data: users = [],
  //   isLoading: isUsersLoading,
  //   isError: isUsersError,
  // } = useGetFollowedSpecialistsQuery(
  //   { id: currentUserId },
  //   { skip: !currentUserId || activeTab !== tabs[2].key },
  // );

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
        onEditClick={onEditClick}
      >
        <div className={s.content}>
          {activeTab === tabs[0].key && (
            <Analyzes userId={user.id} isAccess={true} />
          )}
          {activeTab === tabs[1].key && (
            <Questionnaire userId={user.id} isAccess={true} />
          )}
          {activeTab === tabs[2].key && (
            <Progress userId={user.id} isAccess={true} />
          )}
          {activeTab === tabs[3].key && (
            <SpecialistListTab
              specialists={specialists}
              handleRemoveClick={handleRemoveClick}
            />
          )}
          {activeTab === tabs[4].key && (
            <SubscribersListTab
              subscribes={subscribes}
              handleRejectClick={handleRejectClick}
              handleApplyClick={handleApplyClick}
              handleRemoveClick={handleRemoveClick}
            />
          )}
        </div>
      </ClientProfileLayout>
    </>
  );
};

export default ClientProfilePrivate;
