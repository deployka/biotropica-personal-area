import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useHistory } from 'react-router';
import { BaseUser } from '../../../@types/entities/BaseUser';
import { CurrentTariff } from '../../../@types/entities/Tariff';
import { Tab, Tabs } from '../../../shared/Global/Tabs/Tabs';
import Button from '../../Button/Button';
import { ProfileCard } from '../../Profile/Card/UserCard';
import { ProfileGoals } from '../../Profile/Goals/Goals';

import s from './Client.module.scss';
import specialistsApi, {
  useGetCurrentSpecialistQuery,
} from '../../../api/specialists';
import {
  useCreateSubscribersMutation,
  useSubscribersByUserIdCorrectedQuery,
  useUpdateSubscribByIdMutation,
} from '../../../api/subscribers';
import { SubscribeStatus } from '../../../@types/dto/subscribers/update-subscriber.dto';
import { ROLE } from '../../../@types/entities/Role';
import userApi, { useCurrentUserQuery } from '../../../api/user';
import { useAppDispatch } from '../../../store/storeHooks';

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

  const { data: currentSpecialist, refetch } = useGetCurrentSpecialistQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    },
  );

  const [
    createSubscriber,
    { isLoading: isCreateLoading, isSuccess: isCreateSuccess },
  ] = useCreateSubscribersMutation();
  const { data: subscribers } = useSubscribersByUserIdCorrectedQuery(user.id);

  const [updateSubscribes] = useUpdateSubscribByIdMutation();

  const { data: currentUser } = useCurrentUserQuery();

  const isMe = useMemo(() => user.id === currentUser?.id, [currentUser, user]);

  const isFollower = useMemo(() => {
    console.log(user.specialists, currentSpecialist);
    if (!user.specialists.length) {
      return false;
    }
    const isMatch = user.specialists.find(s => s.id === currentSpecialist?.id);
    return Boolean(isMatch);
  }, [currentSpecialist, user.specialists]);

  console.log(currentSpecialist);

  const subscriber = useMemo(() => {
    const subsc = subscribers?.find(
      s => s.specialistId === currentSpecialist?.id,
    );
    if (!subsc) {
      return null;
    }
    return subsc;
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

  const handleApplyClick = useCallback(async () => {
    if (subscriber) {
      await updateSubscribes({
        id: subscriber.id,
        status: SubscribeStatus.SUBSCRIBE,
      });
      refetch();
    }
    // changeStatusHandler(id, SubscribeStatus.SUBSCRIBE);
  }, [refetch, subscriber, updateSubscribes]);

  const handleRejectClick = useCallback(async () => {
    if (currentUser) {
      await updateSubscribes({
        id: currentUser.id,
        status: SubscribeStatus.REJECTED,
      });
    }
  }, [currentUser, updateSubscribes]);

  const renderSubscribeStatus = useMemo(() => {
    if (
      subscriber?.status === SubscribeStatus.IN_PROGRESS &&
      currentSpecialist?.user.roles.find(el => el.name === ROLE.TRAINER)
    ) {
      return (
        <div className={s.buttonContainer}>
          <button
            className={[s.btn, s.apply].join(' ')}
            onClick={handleApplyClick}
          >
            Подтвердить
          </button>
          <button
            className={[s.btn, s.reject].join(' ')}
            onClick={handleRejectClick}
          >
            Отказать
          </button>
        </div>
      );
    }
    if (subscriber?.status === SubscribeStatus.IN_PROGRESS || isCreateSuccess) {
      return (
        <div className={[s.subscribeStatus, s.progressSubscribe].join(' ')}>
          <h5>Заявка на рассмотрении</h5>
        </div>
      );
    }
    if (subscriber?.status === SubscribeStatus.REJECTED) {
      return (
        <div className={[s.subscribeStatus, s.rejectedSubscribe].join(' ')}>
          <h5>Заявка отклонена</h5>
        </div>
      );
    }

    if (subscriber?.status === SubscribeStatus.BLOCKED) {
      return (
        <div className={[s.subscribeStatus, s.blockedSubscribe].join(' ')}>
          <h5>Заблокировано</h5>
        </div>
      );
    }
  }, [
    subscriber?.status,
    currentSpecialist?.user.roles,
    isCreateSuccess,
    handleApplyClick,
    handleRejectClick,
  ]);

  const renderInformation = useMemo(
    () => (
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
    ),
    [activeTab, children, onActiveTabChange, tabs],
  );

  const renderButtons = useMemo(() => {
    if (isCreateLoading || isCreateSuccess) {
      return null;
    }
    if (isFollower && subscriber?.status !== SubscribeStatus.BLOCKED) {
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
    if (!subscriber?.status) {
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
    subscriber?.status,
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
      {(isFollower || isMe) && renderInformation}
    </div>
  );
};
