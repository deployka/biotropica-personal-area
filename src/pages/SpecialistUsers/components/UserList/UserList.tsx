import React, { useEffect, useState } from 'react';
import { UsersTableHeader } from './UsersTableHeader';
import { UsersTable } from './UsersTable';
import { BaseUser } from '../../../../@types/entities/BaseUser';
import { Filter } from '../../../../components/Filter/Filter';
import { filterUsersByQuery, usersFilters } from './usersHelper';

import s from '../../Users.module.scss';

type Props = {
  users: BaseUser[];
  setIsWaitingUsersList: (isWaiting: boolean) => void;
};

type Filters = {
  waitingForRecommendation: string[];
  ward: string[];
};

export function UserList({ users, setIsWaitingUsersList }: Props) {
  const [isFilterOpened, setIsFilterOpened] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    waitingForRecommendation: ['no'],
    ward: ['all'],
  });

  let filteredUsers = users;

  if (query) {
    filteredUsers = filterUsersByQuery(filteredUsers, query);
  }

  useEffect(() => {
    const isWaitingUsersList = filters.waitingForRecommendation[0] === 'yes';
    setIsWaitingUsersList(isWaitingUsersList);
  }, [filters.waitingForRecommendation]);

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
        <UsersTableHeader
          userLength={filteredUsers.length}
          onFilterBtnClick={() => setIsFilterOpened(!isFilterOpened)}
          isFiltersOpen={isFilterOpened}
          query={query}
          onSearch={setQuery}
        />
        {!filteredUsers.length && (
          <p className={s.empty}>Пользователи не найдены</p>
        )}
        <UsersTable users={filteredUsers} />
      </div>
    </div>
  );
}
