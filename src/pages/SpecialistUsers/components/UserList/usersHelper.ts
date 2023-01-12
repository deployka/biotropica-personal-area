import { BaseUser } from '../../../../@types/entities/BaseUser';
import { Client } from '../../../../@types/entities/Client';
import { FilterField } from '../../../../components/Filter/Filter';

export const usersFilters: FilterField[] = [
  {
    name: 'Рекомендация',
    key: 'waitingForRecommendation',
    type: 'radio',
    filters: [
      {
        value: 'all',
        label: 'Все',
      },
      {
        value: 'yes',
        label: 'Ожидают',
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
    name: 'Подопечные',
    key: 'ward',
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

export function filterUsersByQuery(users: BaseUser[], q: string) {
  const query = q.toLowerCase().trim();
  return users.filter(user => {
    return (
      user.name?.toLowerCase().includes(query) ||
      user.lastname?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });
}

export function filterUsersByWard(
  users: BaseUser,
  wards: string[],
  specialistId: number,
) {
  const ward = wards[0];
  if (ward === 'all' || !ward) {
    return users;
  }
  if (ward === 'yes') {
    if (users.specialistId === specialistId) {
      return users.specialistId;
    }
  } else {
    if (
      users.specialistId !== specialistId ||
      users.specialistId === undefined
    ) {
      return users;
    }
  }
}

export function filterUsersByWaiting(users: BaseUser[], q: string) {
  const query = q.toLowerCase().trim();
  return users.filter(user => {
    return (
      user.name?.toLowerCase().includes(query) ||
      user.lastname?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });
}

export function filterUserByQuestionnaire(
  user: BaseUser,
  value: 'all' | 'finished' | 'notFinished',
) {
  if (value === 'all') return true;

  if (value === 'finished') {
    return (user as Client).questionHash?.includes('FINISHED');
  }
  if (value === 'notFinished') {
    return (user as Client).questionHash === null;
  }
  return false;
}

export const analyzePassedStatus: Record<string, boolean | undefined> = {
  loaded: true,
  notLoaded: false,
  all: undefined,
};
