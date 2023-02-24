import React, { useState } from 'react';
import { useHistory } from 'react-router';
import type { BaseUser } from '../../@types/entities/BaseUser';

import { getFullName } from '../../utils/getFullName';
import { UsersListTabHeader } from './Header/Header';
import { UsersListTabItem } from './Item/Item';
import { filterUserByQuery } from './usersListHelper';

import s from './Tab.module.scss';
import { getUserRolesList } from '../../utils/getUserRolesList';
import { ROLE } from '../../@types/entities/Role';

type Props = {
  isLoading?: boolean;
  isError?: boolean;
  users: BaseUser[];
};

export const SpecialistListTab = ({ users, isLoading, isError }: Props) => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');

  const handleClick = (user: BaseUser) => {
    history.push(`/specialists/${user?.specialist?.id}`);
  };

  const filteredUsers = users.filter(user =>
    filterUserByQuery(user, searchQuery),
  );

  if (isLoading) return <p>Загрузка...</p>;

  if (!isLoading && isError) return <p>Произошла ошибка</p>;

  return (
    <div className={s.users}>
      <UsersListTabHeader
        query={searchQuery}
        usersCount={users.length}
        onChange={setSearchQuery}
      />
      {filteredUsers.map(user => (
        <UsersListTabItem
          key={user.id}
          onClick={() => handleClick(user)}
          fullName={getFullName(user.name, user.lastname)}
        />
      ))}
      {filteredUsers.length === 0 && (
        <div className={s.notFound}>Тренеры не найдены</div>
      )}
    </div>
  );
};
