import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { BaseUser } from '../../../@types/entities/BaseUser';
import { getFullName } from '../../../utils/getFullName';
import { SpecialistUsersListHeader } from './Header';
import { SpecialistUsersListItem } from './Item';

import s from './UsersList.module.scss';
import { filterUserByQuery } from './usersListHelper';

type Props = {
  isLoading: boolean;
  isError: boolean;
  users: BaseUser[];
};

export const SpecialistUsersList = ({ users, isLoading, isError }: Props) => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');

  const handleClick = (id: number) => {
    history.push(`/users/${id}`);
  };

  const filteredUsers = users.filter(user =>
    filterUserByQuery(user, searchQuery),
  );

  if (isLoading) {
    <p>Загрузка...</p>;
  }

  if (isError) {
    <p>Произошла ошибка</p>;
  }

  return (
    <div className={s.users}>
      <SpecialistUsersListHeader
        query={searchQuery}
        usersCount={users.length}
        onChange={setSearchQuery}
      />
      {filteredUsers.map(user => (
        <SpecialistUsersListItem
          key={user.id}
          onClick={() => handleClick(user.id)}
          fullName={getFullName(user.name, user.lastname)}
        />
      ))}
      {filteredUsers.length === 0 && (
        <div className={s.notFound}>Пользователей не найдено</div>
      )}
    </div>
  );
};
