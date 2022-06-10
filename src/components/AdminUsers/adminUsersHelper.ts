import { BaseUser } from '../../@types/entities/BaseUser';
import { Client } from '../../@types/entities/Client';
import { ROLE } from '../../@types/entities/Role';

import { TARIFF } from '../../@types/entities/Tariff';
import { FilterConfig } from '../Filter/Filter';

export const usersFilters: FilterConfig[] = [
  {
    name: 'Роль',
    key: 'roles',
    filters: [
      {
        value: undefined,
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
    name: 'Тип тарифа',
    key: 'tariff',
    filters: [
      {
        value: undefined,
        label: 'Все',
      },
      {
        value: TARIFF.BASE,
        label: 'Базовый пакет',
      },
      {
        value: TARIFF.EXTENDED,
        label: 'Расширенный пакет',
      },
      {
        value: TARIFF.INDIVIDUAL,
        label: 'Индивидуальный пакет',
      },
    ],
  },
  {
    name: 'Анкета',
    key: 'questionnaire',
    filters: [
      {
        value: undefined,
        label: 'Все',
      },
      {
        value: true,
        label: 'Заполнена',
      },
      {
        value: false,
        label: 'Не заполнена',
      },
    ],
  },
];

export function filterUsersByRoles(
  users: Array<BaseUser>,
  roles: (ROLE | undefined)[],
) {
  if (roles.length === 1 && !roles[0]) {
    return users;
  }

  return users.filter(user => {
    const userRoles = user.roles.map(it => it);
    for (const userRole of userRoles) {
      if (roles.includes(userRole)) {
        return true;
      }
    }
    return false;
  });
}

export function filterUsersByQuestionnaire(
  users: Array<BaseUser>,
  value: boolean,
) {
  return users.filter(user => {
    if (!user.roles.includes(ROLE.CLIENT)) return false;
    if (value) {
      return (user as Client).questionHash === 'FINISHED';
    } else {
      return (user as Client).questionHash === null;
    }
  });
}

export function filterUsersByTariffs(
  users: Array<BaseUser>,
  tariffs: (TARIFF | undefined)[],
) {
  if (tariffs.length === 1 && !tariffs[0]) {
    return users;
  }

  return users.filter(user => {
    const userTariff = user.roles.includes(ROLE.CLIENT)
      ? (user as Client).tariff
      : undefined;
    return tariffs.includes(userTariff);
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
