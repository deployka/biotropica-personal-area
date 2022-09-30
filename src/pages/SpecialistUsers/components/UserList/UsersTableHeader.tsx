import React from 'react';

import SearchInput from '../../../../components/SearchInput/SearchInput';
import Button from '../../../../components/Button/Button';

import s from './UsersTableHeader.module.scss';

type UsersTableHeaderProps = {
  userLength: number;
  query: string;
  isFiltersOpen: boolean;
  onFilterBtnClick: () => void;
  onSearch: (query: string) => void;
};

export function UsersTableHeader({
  userLength,
  query,
  isFiltersOpen,
  onFilterBtnClick,
  onSearch,
}: UsersTableHeaderProps) {
  return (
    <div className={s.titleLine}>
      <div className={s.title}>
        <h3>Все пользователи</h3>
        <div className={s.counter}>
          <p>{userLength}</p>
        </div>
      </div>
      <div className={s.options}>
        <button className={s.filterButton} onClick={onFilterBtnClick}>
          {isFiltersOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
        </button>

        <div className={s.searchInput}>
          <SearchInput
            value={query}
            onChange={onSearch}
            placeholder="Поиск пользователей"
          />
        </div>
      </div>
    </div>
  );
}
