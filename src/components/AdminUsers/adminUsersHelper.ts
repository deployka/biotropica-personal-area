import { BaseUser } from '../../@types/entities/BaseUser';
import { Client } from '../../@types/entities/Client';
import { ROLE } from '../../@types/entities/Role';

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
      return (user as Client).questionHash?.includes('FINISHED');
    }
    if (value === 'notFinished') {
      return (user as Client).questionHash === null;
    }
    return false;
    // return true;
  });
}

export function filterUsersByTariffs(users: BaseUser[], tariffs: string[]) {
  const tariff = tariffs[0];

  if (tariff === 'all' || !tariff) {
    return users;
  }

  if (tariff === 'noTariff') {
    return users.filter(user => user.tariff === null);
  }

  return users.filter(user => user.tariff === tariff);
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
