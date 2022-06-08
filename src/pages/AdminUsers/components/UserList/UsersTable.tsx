import React from 'react';
import { UserItem } from '../UserItem/UserItem';
import { Specialist } from '../../../../@types/entities/Specialist';
import { Client } from '../../../../@types/entities/Client';

import s from './UsersTable.module.scss';
import { BaseUser } from '../../../../@types/entities/BaseUser';

export type UsersTableProps = {
  users: Array<BaseUser>;
  onBlock: (user: BaseUser) => void;
  onWrite: (user: BaseUser) => void;
};

export function UsersTable(props: UsersTableProps) {
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