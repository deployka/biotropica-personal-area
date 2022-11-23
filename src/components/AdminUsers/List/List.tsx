import React, { Dispatch, SetStateAction, useState } from 'react';

import { Filter, FilterField } from '../../Filter/Filter';
import {
  filterUserByQuery,
  filterUserByBanStatus,
  filterUserByQuestionnaire,
  filterUserByRoles,
  filterUserByTariffs,
  usersFilters,
  Filters,
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
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  onCreateUser(): void;
  onProfile: (user: BaseUser) => void;
  onToggleUserBanStatus: (id: number) => void;
  onWriteUser: (user: BaseUser) => void;
};

export function AdminUsersList({
  users,
  filters,
  tariffs,
  setFilters,
  onProfile,
  onCreateUser,
  onToggleUserBanStatus,
  onWriteUser,
}: Props) {
  const [isFilterOpened, setIsFilterOpened] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const filteredUsers = users.filter(user => {
    const isValidRole = filterUserByRoles(user, filters.roles);
    const isValidQuestionnaire = filterUserByQuestionnaire(
      user,
      filters.questionnaire[0],
    );
    const isValidTariff = filterUserByTariffs(user, filters.tariffs);
    const isValidBanStatus = filterUserByBanStatus(user, filters.banned[0]);
    const isQueryValid = filterUserByQuery(user, query);
    return (
      isValidRole &&
      isValidQuestionnaire &&
      isValidTariff &&
      isValidBanStatus &&
      isQueryValid
    );
  });

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
          onToggleUserBanStatus={onToggleUserBanStatus}
          onWrite={onWriteUser}
        />
      </div>
    </div>
  );
}
