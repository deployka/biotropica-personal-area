import React from 'react';

import SearchInput from '../../SearchInput/SearchInput';
import Button from '../../Button/Button';

import s from './Header.module.scss';

type UsersTableHeaderProps = {
  userLength: number;
  onFilterBtnClick: () => void;
  filterOpened: boolean;
  query: string;
  onSearch: (q: string) => void;
  onCreateUserBtnClick: () => void;
};

export function AdminUsersHeader(props: UsersTableHeaderProps) {
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
        <div className={s.panelBtns}>
          <Button className={s.createBtn} onClick={props.onFilterBtnClick}>
            {props.filterOpened ? 'Скрыть фильтры' : 'Показать фильтры'}
          </Button>
          {/* TODO: реализовать метод формирования XLSX таблицы */}
          {/* <a */}
          {/*    className={`${s.button} ${s.buttonPrimary} ${s.xlsxBtn}`} */}
          {/*    href={process.env.REACT_APP_BACKEND_URL + '/users/xlsx'} */}
          {/*    download */}
          {/*    target="_blank" */}
          {/* > */}
          {/*    Выгрузить xlsx */}
          {/* </a> */}
          <Button
            isPrimary={true}
            className={`${s.createBtn}`}
            onClick={props.onCreateUserBtnClick}
          >
            Создать аккаунт
          </Button>
        </div>
      </div>
    </div>
  );
}
