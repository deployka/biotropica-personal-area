import React, { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { BaseUser } from '../../../@types/entities/BaseUser';
import { CurrentTariff } from '../../../@types/entities/Tariff';
import { Tab, Tabs } from '../../../shared/Global/Tabs/Tabs';
import Button from '../../Button/Button';
import { ProfileCard } from '../../Profile/Card/UserCard';
import { ProfileGoals } from '../../Profile/Goals/Goals';
import { ProfileTariff } from '../../Profile/Tariffs/Tariff';

import s from './Client.module.scss';
import { useGetCurrentSpecialistQuery } from '../../../api/specialists';
import { useCreateSubscribersMutation, useSubscribersByUserIdMutation } from '../../../api/subscribers';
import { SubscribeStatus } from '../../../@types/dto/subscribers/update-subscriber.dto';
import { Subscribe } from '../../../@types/entities/Subscribe';

type Props = PropsWithChildren<{
  user: BaseUser;
  tabs: Tab[];
  activeTab: string;
  isPublic: boolean;
  goalsCount: number;
  isGoalsLoading?: boolean;
  currentTariff?: CurrentTariff;
  onActiveTabChange: (tabKey: string) => void;
  onEditClick?: () => void;
  onChatClick?: () => void;
  onClickBuyTariff?: () => void;
  onMoveToTasks?: () => void;
}>;

export const ClientProfileLayout = ({
  user,
  tabs,
  children,
  isPublic,
  activeTab,
  goalsCount,
  currentTariff,
  isGoalsLoading,
  onActiveTabChange,
  onEditClick,
  onChatClick,
  onMoveToTasks,
}: Props) => {
  const history = useHistory();
  const handleMoveToGoal = () => {
    history.push('/goals');
  };

  const { data: currentSpecialist } = useGetCurrentSpecialistQuery();

  const [
    createSubscriber,
    {
      isLoading: isCreateLoading,
      isSuccess: isCreateSuccess,
    },
  ] = useCreateSubscribersMutation();
  const [getUserSubscribers] = useSubscribersByUserIdMutation();

  const [subscribers, setSubscribes] = useState<Subscribe[]>([]);

  useEffect(() => {
    getUserSubscribers(user.id)
      .then(({ data }: any) => {
        if (data) {
          setSubscribes(data);
        }
      })
      .catch(e => console.log(e));
  }, [getUserSubscribers, activeTab, user.id]);

  const isFollower = useMemo(() => {
    if (!user.specialists.length) {
      return false;
    }
    const isMatch = user.specialists.find(s => s.id === currentSpecialist?.id);
    return Boolean(isMatch);
  }, [currentSpecialist?.id, user.specialists]);

  const subscribeStatus = useMemo(() => {
    const subsc = subscribers?.filter(s => s.specialistId === currentSpecialist?.id)[0];
    if (!subsc) {
      return null;
    }
    return subsc.status;
  }, [currentSpecialist?.id, subscribers]);

  const onSubscribeClick = useCallback(async () => {
    const userId = user.id;
    const specialistId = currentSpecialist?.id;

    if (specialistId && userId) {
      await createSubscriber({
        userId,
        specialistId,
      });
    }
  }, [createSubscriber, currentSpecialist, user]);

  const renderSubscribeStatus = useMemo(() => {
    if (subscribeStatus === SubscribeStatus.IN_PROGRESS || isCreateSuccess) {
      return <div className={[s.subscribeStatus, s.progressSubscribe].join(' ')}><h5>Заявка на рассмотрении</h5></div>;
    }
    if (subscribeStatus === SubscribeStatus.REJECTED) {
      return <div className={[s.subscribeStatus, s.rejectedSubscribe].join(' ')}><h5>Заявка отклонена</h5></div>;
    }
  }, [subscribeStatus, isCreateSuccess]);

  const renderButtons = useMemo(() => {
    if (isCreateLoading || isCreateSuccess) {
      return null;
    }
    if (isFollower) {
      return (
        <>
          <Button
            isPrimary
            className={s.moveToTasksBtn}
            onClick={onMoveToTasks}
          >
            Задачи и рекомендации
          </Button>
          <Button
            css={{ margin: '10px 0 0 0' }}
            isFunctional
            className={s.moveToTasksBtn}
            onClick={onChatClick}
          >
            Начать чат
          </Button>
        </>
      );
    }
    if (!subscribeStatus) {
      return (
        <Button
          css={{ margin: '10px 0 0 0' }}
          isFunctional
          className={s.moveToTasksBtn}
          onClick={onSubscribeClick}
        >
          Предложить тренировку
        </Button>
      );
    }
  }, [
    isFollower,
    onChatClick,
    onMoveToTasks,
    onSubscribeClick,
    subscribeStatus,
    isCreateLoading,
    isCreateSuccess,
  ]);

  return (
    <div className={s.profile}>
      <div className={s.info}>
        <ProfileCard
          user={user}
          isPublic={isPublic}
          isFollower={isFollower}
          onEditClick={onEditClick}
        />
        <div className={s.statistics}>
          {!isPublic && (
            <ProfileGoals
              isLoading={isGoalsLoading}
              onMoveToGoals={handleMoveToGoal}
              goalsCount={goalsCount}
            />
          )}
          {/* <ProfileTariff
            isPublic={isPublic}
            title={currentTariff?.tariff?.title}
            expires={currentTariff?.expiredAt}
            isPaid={currentTariff?.isPaid}
            onClickBuyTariff={onClickBuyTariff}
          /> */}
          {isPublic && renderButtons}
          {isPublic && renderSubscribeStatus}
        </div>
      </div>
      <div className={s.content}>
        <div className={s.tabs__container}>
          <div className={s.horizontalScroll}>
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onActiveTabChanged={onActiveTabChange}
              spaceBetween={50}
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
