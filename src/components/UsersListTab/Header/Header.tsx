import React from 'react';
import SearchInput from '../../SearchInput/SearchInput';

import s from './Header.module.scss';

type Props = {
  query: string;
  usersCount: number;
  onChange: (query: string) => void;
};

export const UsersListTabHeader = ({ usersCount, query, onChange }: Props) => {
  return (
    <div className={s.header}>
      <div className={s.title}>
        <h2>Пользователи</h2>
        <div className={s.count}>{usersCount}</div>
      </div>
      <div className={s.searchInput}>
        <SearchInput
          value={query}
          onChange={onChange}
          placeholder="Поиск пользователей"
        />
      </div>
    </div>
  );
};
