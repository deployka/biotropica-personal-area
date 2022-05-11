import s from './UsersTable.module.scss';
import { UserItem } from '../UserItem/UserItem';
import React from 'react';
import { User } from '../../../../store/rtk/types/user';

export type UsersTableProps = {
    users: User[];
    onBlock: (user: User) => void;
    onWrite: (user: User) => void;
}

export function UsersTable(props: UsersTableProps) {
  return <>
    <div className={s.infoBar}>
      <div className={s.name}>
        <p>Имя</p>
      </div>
      <div className={s.date}>
        <p>Дата регистрации</p>
      </div>
      <div className={s.role}>
        <p>Роль</p>
      </div>
      <div className={s.tariff}>
        <p>Тариф</p>
      </div>
    </div>
    <div className={s.usersList}>
      {props.users.map((user, i) => (
        <UserItem
          key={i}
          user={user}
          onBlock={props.onBlock}
          onWrite={props.onWrite}
        />
      ))}
    </div>
  </>;
}
