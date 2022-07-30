import React, { useState } from 'react';

import { Filter, FilterField } from '../../Filter/Filter';
import {
  filterUsersByQuery,
  filterUsersByQuestionnaire,
  filterUsersByRoles,
  filterUsersByTariffs,
  usersFilters,
} from '../adminUsersHelper';
import { ROLE } from '../../../@types/entities/Role';
import { BaseUser } from '../../../@types/entities/BaseUser';
import { Tariff } from '../../../@types/entities/Tariff';
import { AdminUsersHeader } from '../Header/Header';
import { AdminUsersTable } from '../Table/Table';

import s from './List.module.scss';

type Props = {
  users: Array<BaseUser>;
  tariffs: Tariff[];
  onCreateUser(): void;
  onProfile: (user: BaseUser) => void;
  onBlockUser(user: BaseUser): void;
  onWriteUser(id: number): void;
};

type Filters = {
  roles: (ROLE | 'all')[];
  questionnaire: string[];
  tariffs: string[];
};

export function AdminUsersList({
  users,
  tariffs,
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
    tariffs: ['all'],
  });

  let filteredUsers = users;
  filteredUsers = filterUsersByRoles(filteredUsers, filters.roles);
  filteredUsers = filterUsersByQuestionnaire(
    filteredUsers,
    filters.questionnaire[0],
  );
  filteredUsers = filterUsersByTariffs(filteredUsers, filters.tariffs);

  const tariffsFilters = tariffs.map(tariff => ({
    value: `${tariff.id}`,
    label: tariff.title,
  }));
  const test: FilterField[] = [
    ...usersFilters,
    {
      name: 'Тариф',
      key: 'tariffs',
      type: 'radio',
      filters: [
        { value: 'all', label: 'Все' },
        ...tariffsFilters,
        { value: 'noTariff', label: 'Нет тарифа' },
      ],
    },
  ];

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
        filters={test}
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
          tariffs={tariffs}
          onProfile={onProfile}
          onBlock={onBlockUser}
          onWrite={onWriteUser}
        />
      </div>
    </div>
  );
}
