import React from 'react';
import Button from '../../../../components/Button/Button';

import SearchInput from '../../../../components/SearchInput/SearchInput';

import s from './UsersTableHeader.module.scss';

type UsersTableHeaderProps = {
  title: string;
  userLength: number;
  query: string;
  isFiltersOpen: boolean;
  onFilterBtnClick: () => void;
  onSearch: (query: string) => void;
};

export function UsersTableHeader({
  title,
  userLength,
  query,
  isFiltersOpen,
  onFilterBtnClick,
  onSearch,
}: UsersTableHeaderProps) {
  return (
    <div className={s.titleLine}>
      <div className={s.title}>
        <h3>{title}</h3>
        <div className={s.counter}>
          <p>{userLength}</p>
        </div>
      </div>
      <div className={s.options}>
        <Button className={s.button} isPrimary onClick={onFilterBtnClick}>
          {isFiltersOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
        </Button>

        <div className={s.searchInput}>
          <SearchInput value={query} onChange={onSearch} placeholder="Поиск" />
        </div>
      </div>
    </div>
  );
}
