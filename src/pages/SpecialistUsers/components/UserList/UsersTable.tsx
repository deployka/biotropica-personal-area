import React from 'react';
import s from './UsersTable.module.scss';
import { UserItem } from '../UserItem/UserItem';
import { User } from '../../../../store/rtk/types/user';

export type UsersTableProps = {
  users: User[];
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
