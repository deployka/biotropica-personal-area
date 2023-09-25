import React, { Dispatch, SetStateAction, useState } from 'react';

import { Filter, FilterField } from '../../Filter/Filter';
import {
  filterUserByQuery,
  filterUserByBanStatus,
  filterUserByQuestionnaire,
  filterUserByRoles,
  usersFilters,
  Filters,
  filterUserByActiveStatus,
} from '../adminUsersHelper';
import { BaseUser } from '../../../@types/entities/BaseUser';
import { AdminUsersHeader } from '../Header/Header';
import { AdminUsersTable } from '../Table/Table';

import s from './List.module.scss';

type Props = {
  users: Array<BaseUser>;
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
    const isValidBanStatus = filterUserByBanStatus(user, filters.banned[0]);
    const isQueryValid = filterUserByQuery(user, query);
    const isInactive = filterUserByActiveStatus(user, filters.status[0]);
    return (
      isValidRole &&
      isValidQuestionnaire &&
      isValidBanStatus &&
      isQueryValid &&
      isInactive
    );
  });

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
          onToggleUserBanStatus={onToggleUserBanStatus}
          onWrite={onWriteUser}
        />
      </div>
    </div>
  );
}
