import React, { useState } from 'react';

import s from '../../Users.module.scss';
import { UsersFilter } from '../UserFilter/UsersFilter';
import {
  filterUsersByQuery,
  filterUsersByRoles,
  filterUsersByTariffs,
  usersFilters,
} from '../../helpers/usersHelper';
import { UsersTableHeader } from './UsersTableHeader';
import { UsersTable } from './UsersTable';
import { TARIFF, User } from '../../../../store/rtk/types/user';
import { ROLE } from '../../../../store/@types/User';

type Props = {
  users: User[];
  onCreateUser(): void;
  onBlockUser(user: User): void;
  onWriteUser(user: User): void;
};

type Filters = {
  roles: (ROLE | undefined)[];
  tariff: (TARIFF | undefined)[];
};

export function UserList({
  users,
  onCreateUser,
  onBlockUser,
  onWriteUser,
}: Props) {
  const [filterOpened, setFilterOpened] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    roles: [undefined],
    tariff: [undefined],
  });

  let filteredUsers = users;
  if (filters.roles.length) {
    filteredUsers = filterUsersByRoles(filteredUsers, filters.roles);
  }

  if (filters.tariff.length) {
    filteredUsers = filterUsersByTariffs(filteredUsers, filters.tariff);
  }

  if (query) {
    filteredUsers = filterUsersByQuery(filteredUsers, query);
  }

  return (
    <div className={s.adminPanel}>
      <UsersFilter
        opened={filterOpened}
        filters={usersFilters}
        selectedFilters={filters}
        onChange={(filters: Filters) => setFilters(filters)}
      />
      <div className={`${s.listPanel} ${filterOpened ? '' : s.full}`}>
        <UsersTableHeader
          userLength={filteredUsers.length}
          onFilterBtnClick={() => setFilterOpened(!filterOpened)}
          filterOpened={filterOpened}
          query={query}
          onSearch={setQuery}
          onCreateUserBtnClick={onCreateUser}
        />
        <UsersTable
          users={filteredUsers}
          onBlock={onBlockUser}
          onWrite={onWriteUser}
        />
      </div>
    </div>
  );
}
