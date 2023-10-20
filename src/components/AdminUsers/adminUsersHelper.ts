import { BaseUser } from '../../@types/entities/BaseUser';
import { Client } from '../../@types/entities/Client';
import { ROLE } from '../../@types/entities/Role';
import { Tariff } from '../../@types/entities/Tariff';

import { FilterField } from '../Filter/Filter';

export type Filters = {
  roles: (ROLE | 'all')[];
  questionnaire: ('all' | 'finished' | 'notFinished')[];
  analyzes: ('all' | 'loaded' | 'notLoaded')[];
  banned: ('all' | 'yes' | 'no')[];
  status: ('all' | 'inactive')[];
};

export const usersFilters: FilterField[] = [
  {
    name: 'Статус',
    key: 'status',
    type: 'checkbox',
    filters: [{ value: 'inactive', label: 'Ждут активации' }],
  },
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
        value: ROLE.TRAINER,
        label: 'Специалист',
      },
      {
        value: ROLE.ADMIN,
        label: 'Администратор',
      },
    ],
  },
  {
    name: 'Анализы',
    key: 'analyzes',
    type: 'radio',
    filters: [
      {
        value: 'all',
        label: 'Все',
      },
      {
        value: 'loaded',
        label: 'Загружены',
      },
      {
        value: 'notLoaded',
        label: 'Не загружены',
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
  {
    name: 'Заблокирован',
    key: 'banned',
    type: 'radio',
    filters: [
      {
        value: 'all',
        label: 'Все',
      },
      {
        value: 'yes',
        label: 'Да',
      },
      {
        value: 'no',
        label: 'Нет',
      },
    ],
  },
];

export function filterUserByRoles(user: BaseUser, roles: (ROLE | 'all')[]) {
  if (roles.includes('all')) {
    return true;
  }

  const userRoles = user.roles.map(role => role.name);
  return userRoles.map(role => roles.includes(role)).every(it => it);
}

export function filterUserByQuestionnaire(
  user: BaseUser,
  value: 'all' | 'finished' | 'notFinished',
) {
  if (value === 'all') return true;

  if (!user.roles.some(role => role.name === ROLE.CLIENT)) return false;
  if (value === 'finished') {
    return (user as Client).questionHash?.includes('FINISHED');
  }
  if (value === 'notFinished') {
    return (user as Client).questionHash === null;
  }
  return false;
}

export function filterUserByTariffs(user: BaseUser, tariffs: string[]) {
  const tariff = tariffs[0];

  if (tariff === 'all' || !tariff) {
    return true;
  }

  if (tariff === 'noTariff') {
    return (
      user.tariff === null && user.roles.find(role => role.name === ROLE.CLIENT)
    );
  }

  return user.tariff === tariff;
}

export function filterUserByQuery(user: BaseUser, q: string) {
  const query = q.toLowerCase().trim();
  const { name, lastname, email } = user;
  return [name, lastname, email].some(field =>
    field?.toLowerCase().includes(query),
  );
}

export function filterUserByBanStatus(
  user: BaseUser,
  isBanned: 'all' | 'yes' | 'no',
) {
  if (isBanned === 'all') return true;

  if (isBanned === 'yes') return user.banned;

  return !user.banned;
}

export function filterUserByActiveStatus(
  user: BaseUser,
  isActive: 'all' | 'inactive',
) {
  if (isActive === 'all') return true;

  return !user.isEnabled;
}

export function getUserTariff(tariffs: Tariff[], user: BaseUser) {
  let tariff =
    tariffs.find(tariff => tariff.id === +(user.tariff || ''))?.title ||
    'Нет тарифа';

  if (user.roles.find(role => role.name !== ROLE.CLIENT)) {
    tariff = '';
  }

  return tariff;
}

export const analyzePassedStatus: Record<string, boolean | undefined> = {
  loaded: true,
  notLoaded: false,
  all: undefined,
};
