import { BaseUser } from '../../@types/entities/BaseUser';
import { Client } from '../../@types/entities/Client';
import { ROLE } from '../../@types/entities/Role';

import { TARIFF } from '../../@types/entities/Tariff';
import { FilterField } from '../Filter/Filter';

export const usersFilters: FilterField[] = [
  {
    name: 'Роль',
    key: 'roles',
    type: 'checkbox',
    filters: [
      {
        value: 'all',
        label: 'Все',
      },
      {
        value: ROLE.CLIENT,
        label: 'Пользователь',
      },
      {
        value: ROLE.SPECIALIST,
        label: 'Специалист',
      },
      {
        value: ROLE.ADMIN,
        label: 'Администратор',
      },
    ],
  },
  {
    name: 'Анкета',
    key: 'questionnaire',
    type: 'radio',
    filters: [
      {
        value: 'all',
        label: 'Все',
      },
      {
        value: 'finished',
        label: 'Заполнена',
      },
      {
        value: 'notFinished',
        label: 'Не заполнена',
      },
    ],
  },
];

export function filterUsersByRoles(
  users: Array<BaseUser>,
  roles: (ROLE | 'all')[],
) {
  if (!roles[0]) {
    return users;
  }

  if (roles.includes('all')) {
    return users;
  }

  return users.filter(user => {
    const userRoles = user.roles.map(it => it.name);
    return userRoles.map(role => roles.includes(role)).every(it => it);
    // for (const userRole of userRoles) {
    //   if (roles.includes(userRole)) {
    //     return true;
    //   }
    // }
    // return false;
  });
}

export function filterUsersByQuestionnaire(
  users: Array<BaseUser>,
  value: string,
) {
  if (value === 'all') return users;
  return users.filter(user => {
    if (!user.roles.some(role => role.name === ROLE.CLIENT)) return false;
    if (value === 'finished') {
      return (user as Client).questionHash === 'FINISHED';
    }
    if (value === 'notFinished') {
      return (user as Client).questionHash === null;
    }
    return false;
    // return true;
  });
}

export function filterUsersByTariffs(
  users: Array<BaseUser>,
  tariffs: (TARIFF | 'all')[],
) {
  if (tariffs.length === 1 && !tariffs[0]) {
    return users;
  }

  return users.filter(user => {
    // const userTariff = user.roles.some(it => it.name === ROLE.CLIENT)
    //   ? (user as Client).tariff
    //   : undefined;
    // return tariffs.includes(userTariff);
    return true;
  });
}

export function filterUsersByQuery(users: Array<BaseUser>, q: string) {
  const query = q.toLowerCase().trim();
  return users.filter(user => {
    return (
      user.name?.toLowerCase().includes(query) ||
      user.lastname?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });
}
