import React from 'react';
import { BaseUser } from '../../../@types/entities/BaseUser';
import { Tariff } from '../../../@types/entities/Tariff';

import { UserItem } from '../Item/Item';

import s from './Table.module.scss';

export type UsersTableProps = {
  users: BaseUser[];
  onProfile: (user: BaseUser) => void;
  onToggleUserBanStatus: (id: number) => void;
  onWrite: (user: BaseUser) => void;
};

export function AdminUsersTable({
  users,
  onWrite,
  onProfile,
  onToggleUserBanStatus,
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
      </div>
      <div className={s.usersList}>
        {users.length !== 0 ? (
          users.map((user, i) => (
            <UserItem
              key={i}
              user={user}
              onProfile={() => onProfile(user)}
              onToggleUserBanStatus={() => {
                onToggleUserBanStatus(user.id);
              }}
              onWrite={() => onWrite(user)}
            />
          ))
        ) : (
          <p className={s.emptyList}>Пользователи не найдены</p>
        )}
      </div>
    </>
  );
}
