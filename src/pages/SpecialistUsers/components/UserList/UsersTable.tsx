import React from 'react';
import s from './UsersTable.module.scss';
import { UserItem } from '../UserItem/UserItem';
import { Client } from '../../../../@types/entities/Client';

export type UsersTableProps = {
  users: Client[];
};

export function UsersTable(props: UsersTableProps) {
  return (
    <>
      <div className={s.usersList}>
        {props.users.map((user, i) => (
          <UserItem key={i} user={user} />
        ))}
      </div>
    </>
  );
}
