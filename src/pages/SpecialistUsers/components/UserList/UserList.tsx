import React, { useState } from 'react';

import s from '../../Users.module.scss';
import {
  filterUsersByQuery,
  filterUsersByRoles,
  filterUsersByTariffs,
} from '../../helpers/usersHelper';
import { UsersTableHeader } from './UsersTableHeader';
import { UsersTable } from './UsersTable';
import { TARIFF, User } from '../../../../store/rtk/types/user';
import { ROLE } from '../../../../store/@types/User';

type Props = {
  users: User[];
};

type Filters = {
  roles: (ROLE | undefined)[];
  tariff: (TARIFF | undefined)[];
};

export function UserList({ users }: Props) {
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

  const [checked, setChecked] = useState(false);

  return (
    <div className={s.adminPanel}>
      <div className={`${s.listPanel} ${filterOpened ? '' : s.full}`}>
        <UsersTableHeader
          checked={checked}
          onChecked={setChecked}
          userLength={filteredUsers.length}
          onFilterBtnClick={() => setFilterOpened(!filterOpened)}
          filterOpened={filterOpened}
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
