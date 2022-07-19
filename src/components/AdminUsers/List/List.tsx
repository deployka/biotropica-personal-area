import React, { useState } from 'react';

import { Filter } from '../../Filter/Filter';
import {
  filterUsersByQuery,
  filterUsersByQuestionnaire,
  filterUsersByRoles,
  filterUsersByTariffs,
  usersFilters,
} from '../adminUsersHelper';
import { ROLE } from '../../../@types/entities/Role';
import { BaseUser } from '../../../@types/entities/BaseUser';
import { TARIFF } from '../../../@types/entities/Tariff';
import { AdminUsersHeader } from '../Header/Header';
import { AdminUsersTable } from '../Table/Table';

import s from './List.module.scss';

type Props = {
  users: Array<BaseUser>;
  onCreateUser(): void;
  onProfile: (user: BaseUser) => void;
  onBlockUser(user: BaseUser): void;
  onWriteUser(user: BaseUser): void;
};

type Filters = {
  roles: (ROLE | 'all')[];
  questionnaire: string[];
};

export function AdminUsersList({
  users,
  onProfile,
  onCreateUser,
  onBlockUser,
  onWriteUser,
}: Props) {
  const [isFilterOpened, setIsFilterOpened] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    roles: ['all'],
    questionnaire: ['all'],
  });

  let filteredUsers = users;
  filteredUsers = filterUsersByRoles(filteredUsers, filters.roles);
  filteredUsers = filterUsersByQuestionnaire(
    filteredUsers,
    filters.questionnaire[0],
  );

  console.log('roles', filters.roles);
  console.log(
    'roles',
    filteredUsers.map(user => user.roles.map(role => role.name)),
  );

  if (query) {
    filteredUsers = filterUsersByQuery(filteredUsers, query);
  }

  return (
    <div className={s.adminPanel}>
      <Filter
        isHidden={!isFilterOpened}
        onClose={() => {
          setIsFilterOpened(false);
        }}
        filters={usersFilters}
        selectedFilters={filters}
        onChange={(filters: Filters) => setFilters(filters)}
      />
      <div className={`${s.listPanel} ${isFilterOpened ? '' : s.full}`}>
        <AdminUsersHeader
          userLength={filteredUsers.length}
          onFilterBtnClick={() => setIsFilterOpened(!isFilterOpened)}
          filterOpened={isFilterOpened}
          query={query}
          onSearch={setQuery}
          onCreateUserBtnClick={onCreateUser}
        />
        <AdminUsersTable
          users={filteredUsers}
          onProfile={onProfile}
          onBlock={onBlockUser}
          onWrite={onWriteUser}
        />
      </div>
    </div>
  );
}
