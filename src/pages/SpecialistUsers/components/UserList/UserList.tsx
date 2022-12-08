import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UsersTableHeader } from './UsersTableHeader';
import { UsersTable } from './UsersTable';
import { BaseUser } from '../../../../@types/entities/BaseUser';
import { Filter } from '../../../../components/Filter/Filter';
import { filterUsersByQuery, filterUsersByWard, usersFilters } from './usersHelper';
import { useGetCurrentSpecialistQuery } from '../../../../api/specialists';

import s from '../../Users.module.scss';
import { Filters } from '../../SpecialistUsers';

type Props = {
  users: Array<BaseUser>;
  filters: Filters;
  isLoading?: boolean;
  setFilters: Dispatch<SetStateAction<Filters>>;
};

export function UserList({
  users,
  isLoading = false,
  filters,
  setFilters,
}: Props) {
  const [isFilterOpened, setIsFilterOpened] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const {
    data: currentSpecialist,
  } = useGetCurrentSpecialistQuery();

  const currentSpecialistId = currentSpecialist?.user?.id || 0;

  let filteredUsers = users.filter(user => {
    const isValidWard = filterUsersByWard(user, filters.ward, currentSpecialistId);
    return (
      isValidWard
    );
  });

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
        <UsersTableHeader
          userLength={filteredUsers.length}
          onFilterBtnClick={() => setIsFilterOpened(!isFilterOpened)}
          isFiltersOpen={isFilterOpened}
          query={query}
          onSearch={setQuery}
        />

        {isLoading && <p className={s.empty}>Загрузка списка пользователей</p>}
        {!isLoading && !filteredUsers.length && (
          <p className={s.empty}>Пользователи не найдены</p>
        )}
        {!isLoading && <UsersTable users={filteredUsers} />}
      </div>
    </div>
  );
}
