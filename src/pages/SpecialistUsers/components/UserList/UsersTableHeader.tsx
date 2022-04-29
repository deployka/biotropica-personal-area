import s from './UsersTableHeader.module.scss';
import React from 'react';
import SearchInput from '../../../../components/SearchInput/SearchInput';
import classNames from 'classnames';

type UsersTableHeaderProps = {
  userLength: number;
  onFilterBtnClick: () => void;
  filterOpened: boolean;
  query: string;
  checked: boolean;
  onChecked: (checked: boolean) => void;
  onSearch: (q: string) => void;
};

export function UsersTableHeader(props: UsersTableHeaderProps) {
  return (
    <div className={s.titleLine}>
      <div className={s.title}>
        <h3>
          {props.checked
            ? 'Пользователи ожидающие рекомендации'
            : 'Все пользователи'}
        </h3>
        <div className={s.counter}>
          <p>{props.userLength}</p>
        </div>
      </div>
      <div className={s.options}>
        <div className={s.checkbox__wrapper}>
          <input
            onChange={() => props.onChecked(!props.checked)}
            type="checkbox"
            defaultChecked={props.checked}
            name="checkbox"
          />
          <label
            htmlFor="checkbox"
            className={classNames(s.checkbox, {
              [s.error__checkbox]: !props.checked,
            })}
          ></label>
          <span>Ожидают рекомендации</span>
        </div>

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
