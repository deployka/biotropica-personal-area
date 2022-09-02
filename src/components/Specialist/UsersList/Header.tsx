import React from 'react';
import SearchInput from '../../SearchInput/SearchInput';

import s from './Header.module.scss';

type Props = {
  query: string;
  usersCount: number;
  onChange: (query: string) => void;
};

export const SpecialistUsersListHeader = ({
  usersCount,
  query,
  onChange,
}: Props) => {
  return (
    <div className={s.header}>
      <div className={s.title}>
        <h2>Пользователи</h2>
        <div className={s.count}>{usersCount}</div>
      </div>
      <SearchInput
        value={query}
        onChange={onChange}
        placeholder="Поиск пользователей"
      />
    </div>
  );
};
