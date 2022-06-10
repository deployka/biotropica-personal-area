import React, { useState } from 'react';

import { Filter } from '../../Filter/Filter';
import {
  filterUsersByQuery,
  filterUsersByQuestionnaire,
  filterUsersByRoles,
  filterUsersByTariffs,
  usersFilters,
} from '../adminUsersHelper';

import s from './List.module.scss';

import { UsersTableHeader } from './UsersTableHeader';
import { UsersTable } from './UsersTable';
import { ROLE } from '../../../../@types/entities/Role';
import { BaseUser } from '../../../../@types/entities/BaseUser';
import { TARIFF } from '../../../../@types/entities/Tariff';

type Props = {
  users: Array<BaseUser>;
  onCreateUser(): void;
  onBlockUser(user: BaseUser): void;
  onWriteUser(user: BaseUser): void;
};

type Filters = {
  roles: (ROLE | undefined)[];
  tariff: (TARIFF | undefined)[];
  questionnaire: (boolean | undefined)[];
};

export function AdminUsersList({
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
    questionnaire: [undefined],
  });

  let filteredUsers = users;
  if (filters.roles.length) {
    filteredUsers = filterUsersByRoles(filteredUsers, filters.roles);
  }

  if (filters.tariff.length) {
    filteredUsers = filterUsersByTariffs(filteredUsers, filters.tariff);
  }

  if (typeof filters.questionnaire[0] === 'boolean') {
    filteredUsers = filterUsersByQuestionnaire(
      filteredUsers,
      filters.questionnaire[0],
    );
  }

  if (query) {
    filteredUsers = filterUsersByQuery(filteredUsers, query);
  }

  return (
    <div className={s.adminPanel}>
      <Filter
        opened={filterOpened}
        filters={usersFilters}
        selectedFilters={filters}
        onChange={(filters: Filters) => setFilters(filters)}
      />
      <div className={`${s.listPanel} ${filterOpened ? '' : s.full}`}>
        <AdminUsersHeader
          userLength={filteredUsers.length}
          onFilterBtnClick={() => setFilterOpened(!filterOpened)}
          filterOpened={filterOpened}
          query={query}
          onSearch={setQuery}
          onCreateUserBtnClick={onCreateUser}
        />
        <AdminUsersTable
          users={filteredUsers}
          onBlock={onBlockUser}
          onWrite={onWriteUser}
        />
      </div>
    </div>
  );
}
