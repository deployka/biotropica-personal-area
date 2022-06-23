import React from 'react';
import { BaseUser } from '../../../@types/entities/BaseUser';

import { UserItem } from '../Item/Item';

import s from './Table.module.scss';

export type UsersTableProps = {
  users: BaseUser[];
  onProfile: (user: BaseUser) => void;
  onBlock: (user: BaseUser) => void;
  onWrite: (user: BaseUser) => void;
};

export function AdminUsersTable({
  users,
  onProfile,
  onBlock,
  onWrite,
}: UsersTableProps) {
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
        {users.map((user, i) => (
          <UserItem
            key={i}
            user={user}
            onProfile={onProfile}
            onBlock={onBlock}
            onWrite={onWrite}
          />
        ))}
      </div>
    </>
  );
}
