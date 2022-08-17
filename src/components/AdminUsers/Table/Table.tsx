import { format } from 'date-fns';
import React from 'react';
import { BaseUser } from '../../../@types/entities/BaseUser';
import { ROLE } from '../../../@types/entities/Role';
import { Tariff } from '../../../@types/entities/Tariff';
import { getFullName } from '../../../utils/getFullName';
import { getUserTariff } from '../adminUsersHelper';

import { UserItem } from '../Item/Item';

import s from './Table.module.scss';

export type UsersTableProps = {
  users: BaseUser[];
  tariffs: Tariff[];
  onProfile: (user: BaseUser) => void;
  onToggleUserBanStatus: (id: number) => void;
  onWrite: (id: number) => void;
};

export function AdminUsersTable({
  users,
  tariffs,
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
        <div className={s.tariff}>
          <p>Тариф</p>
        </div>
      </div>
      <div className={s.usersList}>
        {users.length !== 0 ? (
          users.map((user, i) => {
            const tariff = getUserTariff(tariffs, user);

            const formattedUser = {
              fullName: getFullName(user.name, user.lastname),
              isBanned: user.banned,
              registrationDate: format(new Date(user.createdAt), 'dd.MM.yyyy'),
              tariff,
              roles: user.roles,
            };

            return (
              <UserItem
                key={i}
                user={formattedUser}
                onProfile={() => onProfile(user)}
                onToggleUserBanStatus={() => {
                  onToggleUserBanStatus(user.id);
                }}
                onWrite={() => onWrite(user.id)}
              />
            );
          })
        ) : (
          <p>Пользователи не найдены</p>
        )}
      </div>
    </>
  );
}
