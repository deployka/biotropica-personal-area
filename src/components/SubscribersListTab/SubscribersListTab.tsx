import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { getFullName } from '../../utils/getFullName';
import { UsersListTabHeader } from './Header/Header';
import { SubscribersListTabItem } from './Item/Item';

import s from './Tab.module.scss';
import { Subscribe } from '../../@types/entities/Subscribe';
import { SubscribeStatus } from '../../@types/dto/subscribers/update-subscriber.dto';
import { BaseUser } from '../../@types/entities/BaseUser';
import { ROLE } from '../../@types/entities/Role';
import { useHistory } from 'react-router';
import { getUserRolesList } from '../../utils/getUserRolesList';

type Props = {
  isLoading?: boolean;
  isError?: boolean;
  subscribes: Subscribe[];
  isSpecialist?: boolean;
  handleRejectClick: (id:number) => void;
  handleApplyClick: (id:number) => void;
  handleRemoveClick: (id:number) => void;
};

export const SubscribersListTab = ({
  subscribes,
  isLoading,
  isError,
  isSpecialist,
  handleApplyClick,
  handleRejectClick,
  handleRemoveClick,
}: Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const [subcribeList, setSubscribeList] = useState<Subscribe[]>([]);

  useEffect(() => {
    setSubscribeList(subscribes);
  }, [subscribes]);

  const history = useHistory();

  const filteredSubscribesByStatus = useMemo(() => {
    return subcribeList.filter(s => s.status === SubscribeStatus.IN_PROGRESS);
  }, [subcribeList]);

  const searchQueryHandker = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleUserClick = useCallback((user: BaseUser) => {
    if (getUserRolesList(user).includes(ROLE.TRAINER)) {
      if (!user.specialist) return;
      history.push(`/specialists/${user.specialist.id}`);
    }

    if (getUserRolesList(user).includes(ROLE.CLIENT)) {
      history.push(`/users/${user.id}`);
    }
  }, [history]);

  const getSubscribersFullName = useCallback((subscribe: Subscribe) => {
    if (isSpecialist) {
      return getFullName(subscribe.user.name, subscribe.user.lastname);
    } else {
      const specialist = subscribe.specialist.user;
      return getFullName(specialist.name, specialist.lastname);
    }
  }, [isSpecialist]);

  if (isLoading) return <p>Загрузка...</p>;

  if (!isLoading && isError) return <p>Произошла ошибка</p>;

  return (
    <div className={s.users}>
      <UsersListTabHeader
        query={searchQuery}
        usersCount={filteredSubscribesByStatus.length}
        onChange={searchQueryHandker}
      />
      {filteredSubscribesByStatus.map(subscribe => (
        <SubscribersListTabItem
          key={subscribe.id}
          handleUserClick={() => handleUserClick(isSpecialist ? subscribe.user : subscribe.specialist.user)}
          fullName={getSubscribersFullName(subscribe)}
          initiatorId={subscribe.initiatorId}
          user={isSpecialist ? subscribe.user : subscribe.specialist.user}
          handleRejectClick={() => handleRejectClick(subscribe.id)}
          handleApplyClick={() => handleApplyClick(subscribe.id)}
          handleRemoveClick={() => handleRemoveClick(subscribe.id)}
        />
      ))}
      {filteredSubscribesByStatus.length === 0 && (
        <div className={s.notFound}>Пользователей не найдено</div>
      )}
    </div>
  );
};
