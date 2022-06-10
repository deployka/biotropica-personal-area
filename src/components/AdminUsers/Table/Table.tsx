import React from 'react';
import { BaseUser } from '../../../@types/entities/BaseUser';

import { UserItem } from '../Item/Item';

import s from './Table.module.scss';

export type UsersTableProps = {
  users: BaseUser[];
  onBlock: (user: BaseUser) => void;
  onWrite: (user: BaseUser) => void;
};

export function AdminUsersTable(props: UsersTableProps) {
  return (
    <>
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
    </>
  );
}
