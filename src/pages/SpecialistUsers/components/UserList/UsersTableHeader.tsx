import s from './UsersTableHeader.module.scss';
import React from 'react';
import SearchInput from '../../../../components/SearchInput/SearchInput';

type UsersTableHeaderProps = {
  userLength: number;
  onFilterBtnClick: () => void;
  filterOpened: boolean;
  query: string;
  onSearch: (q: string) => void;
};

export function UsersTableHeader(props: UsersTableHeaderProps) {
  return (
    <div className={s.titleLine}>
      <div className={s.title}>
        <h3>Все пользователи</h3>
        <div className={s.counter}>
          <p>{props.userLength}</p>
        </div>
      </div>
      <div className={s.options}>
        <SearchInput
          value={undefined as unknown as string}
          onChange={val => {
            return props.onSearch(val);
          }}
          placeholder="Поиск пользователей"
        />
      </div>
    </div>
  );
}
